import $ from 'jquery';
import CodeMirror from 'codemirror';
// Codemirror stuff
// Some styles
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/theme/yeti.css';
// Some libs
import 'codemirror/addon/lint/lint';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/hint/show-hint';

import '../utils/yaml-lint';
import '../utils/yaml-hint';
import ParentController from './parent.controller';
import { escapeNewLine } from '../utils/func.util';
import { simplesearch } from '../utils/search';
import FilePage, { ISFile, IPFile } from '../pages/file.page';
import { FileInfos } from '../../types/front';
import datas from '../utils/datamanager.util';
import { FormEvent } from 'react';

let filecat = '';
export const cat = () => {
  return filecat;
};

export default class FileController extends ParentController {
  static entities: string[] | null;
  static parameters: string[] | null;
  static errors: boolean;
  state: ISFile;
  cansave: boolean;
  autosave: boolean;
  hasReturn: boolean;
  source: any;
  file: string | null;

  constructor(render: FilePage, props: IPFile) {
    super('file', 2, render, props);
    this.state = {
      fileinfos: props.file,
      entities: datas.file.entities,
      params: datas.file.parameters,
      fileloaded: false,
      files: datas.home.files,
      fullfilename: `${props.file.type}.${props.file.filename}`,
      showDoc: false,
      redirect: false,
    };
    this.file = null;
    this.cansave = true;
    this.autosave = false;
    this.hasReturn = true;
    this.source = null;
    filecat = props.file.cat;

    FileController.entities = datas.file.entities;
    FileController.parameters = datas.file.parameters;
    if (filecat === 'training' && !datas.file.entities) {
      this.fetchEntities();
    }
    if (filecat === 'response' && !datas.file.parameters) {
      this.fetchParameters();
    }

    if (!datas.home.files) {
      this.fetchFiles();
    }

    this.fetchFile();
    this.changeState();

    if (datas.app) {
      datas.app.onWindowClick.push(this.windowClick);
      datas.app.onWindowKeyPress.push(this.windowKeyPress);
    }
  }

  fetchEntities = () => {
    fetch('/webapp/api?query=entities')
      .then(response => response.json())
      .then(data => {
        datas.file.entities = data;
        this.state.entities = data;
        FileController.entities = datas.file.entities;
        this.changeState();
        if (!datas.file.parameters) {
          this.fetchParameters();
        }
      });
  };

  fetchParameters = () => {
    fetch('/webapp/api?query=params')
      .then(response => response.json())
      .then(data => {
        datas.file.parameters = data;
        this.state.params = data;
        FileController.parameters = datas.file.parameters;
        this.changeState();
        if (!datas.file.entities) {
          this.fetchEntities();
        }
      });
  };

  fetchFiles = () => {
    fetch('/webapp/api?query=home')
      .then(response => response.json())
      .then(data => {
        datas.home.files = data;
        this.state.files = data;
        this.changeState();
      });
  };

  fetchFile = () => {
    const query = `/webapp/api?query=file&cat=${
      this.state.fileinfos.cat
    }&type=${this.state.fileinfos.type}&name=${this.state.fileinfos.filename}`;
    fetch(query)
      .then(response => response.json())
      .then(data => {
        this.file = data.file;
        this.editorChange();
      });
  };

  windowClick = (event: React.MouseEvent) => {
    this.showDoc(event, false);
  };

  windowKeyPress = (event: React.KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.keyCode === 83) {
      this.save();
    }
  };

  showDoc = (event: React.MouseEvent, show: boolean) => {
    if (event.nativeEvent) {
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
    }
    this.state.showDoc = show;
    this.changeState();
  };

  clickParam = (param: string) => {
    this.source.replaceSelection(`{{ ${param} }}`);
  };

  clickEntity = (entity: string) => {
    this.source.replaceSelection(`{{  | ${entity} }}`);
    const pos = this.source.getCursor();
    pos.ch -= 6 + entity.length;
    this.source.setCursor(pos);
    this.source.focus();
  };

  editorChange = () => {
    if (!this.source || !this.file) return;
    this.state.fileloaded = true;
    const txt = escapeNewLine(this.file.replace(/  /g, '\t'));
    this.source.setValue(txt);
    this.changeState();
  };

  changeFile = (name: string, type: string, cati: 'training' | 'response') => {
    const inf: FileInfos = {
      type,
      filename: name,
      cat: cati,
    };
    this.source.setValue('');
    filecat = cati;
    window.history.pushState('', '', `/webapp/${cati}/${type}/${name}`);
    this.state.fileinfos = inf;
    this.state.fullfilename = `${type}.${name}`;
    this.state.fileloaded = false;
    this.changeState();
    this.fetchFile();
  };

  backToHome = () => {
    this.state.redirect = true;
    this.changeState();
  };

  renderIsMount = () => {
    this.initCodeMirror();
    const li = $("*[search='simple']");
    li.each(search => {
      simplesearch($(li.get(search)));
    });
  };

  clickClone = (e: React.MouseEvent) => {
    if (!e.ctrlKey || this.source.getSelection() !== 'clone') return;
    const line = this.source.getLine(this.source.getCursor().line);
    if (line.startsWith('clone')) {
      const place = line
        .split(':')[1]
        .trim()
        .replace(/"/g, '');
      const fold = place.split('.')[0];
      const file = place.split('.')[1];
      this.changeFile(file, fold, 'response');
    }
  };

  // Functions
  initCodeMirror = () => {
    this.source = CodeMirror.fromTextArea(
      document.getElementById('editor') as HTMLTextAreaElement,
      {
        mode: 'yaml',
        lineNumbers: true,
        theme: 'default',
        value: '',
        gutters: [
          'CodeMirror-lint-markers',
          'CodeMirror-linenumbers',
          'CodeMirror-foldgutter',
        ],
        lint: true,
        smartIndent: true,
        indentUnit: 2,
        tabSize: 2,
        lineWrapping: true,
        autoCloseBrackets: '""',
        extraKeys: {
          'Ctrl-Q': (cm: any) => {
            cm.foldCode(cm.getCursor());
          },
          'Ctrl-Space': 'autocomplete',
        },
        foldGutter: true,
        styleActiveLine: true,
      },
    );
    if (this.file) {
      this.editorChange();
    }
    this.source.on('change', () => {
      if (!this.autosave || !this.hasReturn) return;
      this.save();
    });
  };

  save = () => {
    if (!this.cansave || FileController.errors) return;
    this.cansave = false;
    this.hasReturn = false;
    $('#savebut').addClass('disabled');
    $.ajax({
      method: 'post',
      url: '/webapp/save',
      dataType: 'json',
      data: {
        code: this.source.getValue().replace(/\t/g, '  '),
        file: this.state.fileinfos.filename,
        cat: this.state.fileinfos.cat,
        oldcode: this.file,
      },
    })
      .done(() => {
        this.cansave = true;
        this.hasReturn = true;
        $('#savebut').removeClass('disabled');
      })
      .fail(() => {
        this.hasReturn = true;
        this.cansave = true;
      });
  };

  toggleAutosave = (event: FormEvent<HTMLInputElement>) => {
    this.autosave = event.currentTarget.checked;
  };
}
