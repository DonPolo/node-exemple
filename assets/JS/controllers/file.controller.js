import $ from '../lib/jquery';
import CodeMirror from '../../CodeMirror/lib/codemirror';
// Codemirror stuff
  // Some styles
  import '../../CodeMirror/lib/codemirror.css';
  import '../../CodeMirror/addon/lint/lint.css';
  import '../../CodeMirror/addon/fold/foldgutter.css';
  import '../../CodeMirror/addon/hint/show-hint.css';
  import '../../CodeMirror/theme/yeti.css';
    // Some libs
  import '../../CodeMirror/mode/yaml/yaml';
  import '../../CodeMirror/addon/lint/lint';
  import '../../CodeMirror/addon/lint/yaml-lint';
  import '../../CodeMirror/addon/edit/closebrackets';
  import '../../CodeMirror/addon/fold/foldcode';
  import '../../CodeMirror/addon/fold/foldgutter';
  import '../../CodeMirror/addon/fold/indent-fold';
  import '../../CodeMirror/addon/selection/active-line';
  import '../../CodeMirror/addon/hint/show-hint';
  import '../../CodeMirror/addon/hint/yaml-hint';
// Yaml
import YAML from '../lib/yaml.min';
import ParentController from './parent.controller';
import datamanager from '../utils/datamanager.util';
import { escapeNewLine } from '../utils/func.util';
import { simplesearch } from '../lib/search';

let filecat = '';
export const cat = () => {
  return filecat;
};

export default class FileController extends ParentController {

	// Constructor
	constructor (renderer, fileName, cat, type, app) {
    super();
    this.renderer = renderer;
    this.app = app;

		this.cansave = true;
		this.autosave = false;
		this.hasReturn = true;
    this.source = null;
    filecat = cat;

    this.state = {
      entities: datamanager.file.entities,
      parameters: datamanager.file.parameters,
      file: null,
      files: datamanager.home.files,
      cat: cat,
      type: type,
      filename: fileName,
      showDoc: false
    };
    FileController.entities = datamanager.file.entities;
    FileController.parameters = datamanager.file.parameters;
    if (cat === 'training' && !datamanager.file.entities) {
      this.fetchEntities ();
    }
    if (cat === 'response' && !datamanager.file.parameters) {
      this.fetchParameters ();
    }

    if (!datamanager.home.files) {
      this.fetchFiles ();
    }

    this.fetchFile()
    this.changeState ();
    this.editorChange = this.editorChange.bind(this);
    this.clickParam = this.clickParam.bind(this);
    this.showDoc = this.showDoc.bind(this);
    this.clickClone = this.clickClone.bind(this);
    this.toggleAutosave = this.toggleAutosave.bind(this);
    this.save = this.save.bind(this);
    this.backToHome = this.backToHome.bind(this);

    $(window).click(() => this.showDoc(event, false));
    let me = this;
    $(window).on('keydown', (e) => {
      if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)  && e.keyCode == 83) {
        me.save();
      }
    });
  }

  fetchEntities () {
    fetch('/webapp/api?query=entities')
      .then(response => response.json())
      .then(data => {
        datamanager.file.entities = data;
        this.state.entities = data;
        FileController.entities = datamanager.file.entities;
        this.changeState();
        if (!datamanager.file.parameters) {
          this.fetchParameters();
        }
      });
  }

  fetchParameters () {
    fetch('/webapp/api?query=params')
      .then(response => response.json())
      .then(data => {
        datamanager.file.parameters = data;
        this.state.parameters = data;
        FileController.parameters = datamanager.file.parameters;
        this.changeState();
        if (!datamanager.file.entities) {
          this.fetchEntities();
        }
      });
  }

  fetchFiles () {
    fetch('/webapp/api?query=home')
      .then(response => response.json())
      .then(data => {
        datamanager.home.files = data;
        this.state.files = data;
        this.changeState();
      });
  }

  fetchFile () {
    let query = `/webapp/api?query=file&cat=${this.state.cat}&type=${this.state.type}&name=${this.state.filename}`;
    fetch(query)
      .then(response => response.json())
      .then(data => {
        this.state.file = data.file;
        this.editorChange();
      });
  }

  showDoc (event, show) {
    if (event.nativeEvent) {
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
    }
    this.state.showDoc = show;
    this.changeState();
  }

  clickParam (param) {
    this.source.replaceSelection('{{ ' + param + ' }}');
  }

  clickEntity (entity) {
    this.source.replaceSelection('{{  | ' + entity + ' }}');
    let pos = this.source.getCursor();
    pos.ch -= (6 + entity.length);
    this.source.setCursor(pos);
    this.source.focus();
  }

  editorChange () {
    if (!this.source) return;
    let txt = escapeNewLine(this.state.file.replace(/  /g, "\t"));
		this.source.setValue(txt);
  }

  changeFile (name, type, cat) {
    this.state.filename = name;
    this.state.type = type;
    this.state.cat = cat;
    filecat = cat;
    window.history.pushState('', '', '/webapp/' + cat + '/' + type + '/' + name);
    this.changeState();
    this.fetchFile();
  }

  backToHome () {
    this.app.changePage('');
  }

  renderIsMount () {
    this.initCodeMirror();
    let li = $("*[search='simple']");
    li.each(search => {
      simplesearch($(li.get(search)));
    });
  }

	clickClone (e) {
    if (!e.ctrlKey || this.source.getSelection() !== 'clone') return;
		const line = this.source.getLine(this.source.getCursor().line);
    if (line.startsWith('clone')) {
      const place = line.split(':')[1].trim().replace(/"/g, "");
      const fold = place.split('.')[0];
      const file = place.split('.')[1];
      this.changeFile(file, fold, 'response');
    }
  }

	// Functions
	initCodeMirror () {
		this.source = CodeMirror.fromTextArea($('#editor').get(0), {
      mode: 'yaml',
      lineNumbers: true,
      theme: 'default',
      value: '',
      gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"],
      lint: true,
      smartIndent: true,
      indentUnit: 2,
      tabSize: 2,
      lineWrapping: true,
      autocorrect: true,
      autoCloseBrackets: true,
      extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }, "Ctrl-Space": "autocomplete"},
      foldGutter: true,
      styleActiveLine: true,
    });
    if (this.state.file) {
      this.editorChange();
    }
    this.source.on('change', (e) => {
      if (!this.autosave || !this.hasReturn) return;
      this.save();
    });

	}

	save () {
		if(!this.cansave || FileController.errors) return;
		this.cansave = false;
		this.hasReturn = false;
		$('#savebut').addClass('disabled');
		$.ajax({
			method: 'post',
			url: '/webapp/save',
			dataType: 'json',
			data: {
				code: this.source.getValue().replace(/\t/g, "  "),
				file: this.state.filename,
				cat: this.state.cat,
				oldcode: this.state.file
			},
		}).done((types) => {
			this.cansave = true;
			this.hasReturn = true;
			$('#savebut').removeClass('disabled');
		}).fail(() => {
			this.hasReturn = true;
			this.cansave = true;
		});
  }

  toggleAutosave (event) {
    this.autosave = event.target.checked;
  }
}
