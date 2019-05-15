import $ from './jquery';
import CodeMirror from '../../CodeMirror/lib/codemirror';
import Bubble from './bubble';

function escapeNewLine (text) {
  let a = text.indexOf('"');
  while(a > -1) {
    if (a == 0 || text.charAt(a-1) != "\\") {
      let b = text.indexOf('"', a+1);
      while(b > -1 && text.charAt(b-1) == "\\") {
        b = text.indexOf('"', b+1);
      }
      if (b > -1) {
        let t = text.substring(a+1, b);
        t = t.replace(/\n/g, '\\n');
        text = text.substring(0, a+1) + t + text.substring(b);
      }
      a = text.indexOf('"', b+1);
    } else {
      a = text.indexOf('"', a+1);
    }

  }
  return text;
}

function capitalize (s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default class FileLib {

	// Constructor
	constructor (file, filename, cat, params) {
		this.cansave = true;
		this.autosave = false;
		this.hasReturn = true;
		this.source = null;

		this.file = file;
		this.filename = filename;
		this.cat = cat;
		this.params = params;
	}

	// Events
	onready () {
		if (this.cat === 'training') {
			this.getEntities();
		}

  		this.initCodeMirror();
  		this.getFiles();
	}

	onclickclone () {
		const line = this.source.getLine(this.source.getCursor().line);
        if (line.startsWith('clone')) {
			const place = line.split(':')[1].trim().replace(/"/g, "");
			const fold = place.split('.')[0];
			const file = place.split('.')[1];
			window.location.href = "/webapp/" + fold + "/response/" + file;
        }
	}

	onsave () {
		this.save();
	}

	// Functions
	initCodeMirror () {
		this.source = CodeMirror.fromTextArea(document.getElementById('editor'), {
      mode: 'yaml',
      lineNumbers: true,
      value: file,
      theme: 'default',
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
		this.source.setValue(escapeNewLine(this.file.replace(/  /g, "\t")));
	}

	getEntities () {
		const container = $("#paramcontainer");
		$.ajax({
			method: 'post',
			url: '/webapp/getentities',
			dataType: 'json',
			data: {token: 'MmFJYmkWa1Qfg730c5gORJaEOTsBmXfw'},
		}).done((entities) => {
			this.params = entities;
			container.html('<h2>Entities</h2>');
			entities.forEach(entity => {
			    container.append("<strong entity='" + entity + "' s-val='" + entity + "'>" + entity + "</strong>");
      });
      const classthis = this;
      $('*[entity]').click(function () {
        const entity = $(this).attr('entity');
        classthis.source.replaceSelection('{{  | ' + entity + ' }}');
        let pos = classthis.source.getCursor();
        pos.ch -= (6 + entity.length);
        classthis.source.setCursor(pos);
        classthis.source.focus();
      });
		}).fail(() => {
			console.log("Échec de chargement ");
			container.find('div').html('<strong>Erreur de chargement</strong>');
		});
	}

	getFiles () {
		const container = $("#filecontainer");

		$.ajax({
			method: 'post',
			url: '/webapp/getfiles',
			dataType: 'json',
			data: {token: 'MmFJYmkWa1Qfg730c5gORJaEOTsBmXfw'},
		}).done((types) => {
			container.html("<h2>Training</h2>");
			types.training.forEach(files => {
				files.files.forEach(f => {
				  let cur = false;
				  if ((files.type + '.' + f) === filename) {
				    cur = true;
				  }
				  container.append('<a ' + (cur ? 'class="selected"' : '') + ' href="/webapp/' + files.type + '/training/' + f + '" s-val="' + files.type + '.' + f + '">' + capitalize(files.type) + '.' + capitalize(f) + '</a>');
				});
			});
			container.append("<h2>Responses</h2>");
			types.response.forEach(files => {
				files.files.forEach(f => {
				  let cur = false;
				  if ((files.type + '.' + f.name) === filename) {
				    cur = true;
				  }
				  container.append('<a ' + (cur ? 'class="selected"' : '') + ' bubble-name="' + capitalize(files.type) + '.' + capitalize(f.beauty) + '" bubble="' + f.desc + '" href="/webapp/' + files.type + '/response/' + f.name + '" s-val="' + files.type + '.' + f.name + '">' + capitalize(files.type) + '.' + capitalize(f.beauty) + '</a>');
				});
			});
			Bubble.bind("*[bubble]");
		}).fail(() => {
			console.log("Échec de chargement ");
			container.find('div').html('<strong>Erreur de chargement</strong>');
		});
	}

	save () {
		if(!this.cansave || FileLib.errors) return;
		this.cansave = false;
		this.hasReturn = false;
		$('#savebut').addClass('disabled');
		$.ajax({
			method: 'post',
			url: '/webapp/save',
			dataType: 'json',
			data: {
				code: this.source.getValue().replace(/\t/g, "  "),
				file: this.filename,
				cat: this.cat,
				oldcode: this.file
			},
		}).done((types) => {
			this.cansave = true;
			this.hasReturn = true;
			$('#savebut').removeClass('disabled');
			console.log("Saved !");
		}).fail(() => {
			console.log("Échec de chargement ");
			this.hasReturn = true;
			this.cansave = true;
		});
	}

}
