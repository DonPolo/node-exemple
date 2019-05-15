/* ################# */
/* #### Imports #### */
/* ################# */

// Some style
import '../SASS/file.sass';

// Some libs
import Bubble from './lib/bubble';
import Search from './lib/search';
import FileLib from './lib/filelib';
import accordion from './lib/accordion';

// JQuery Obviously
import $ from './lib/jquery';

// Yaml
import YAML from './lib/yaml.min';

// Codemirror stuff
  // Some styles
import '../CodeMirror/lib/codemirror.css';
import '../CodeMirror/addon/lint/lint.css';
import '../CodeMirror/addon/fold/foldgutter.css';
import '../CodeMirror/addon/hint/show-hint.css';
import '../CodeMirror/theme/yeti.css';
  // Some libs
import '../CodeMirror/mode/yaml/yaml';
import '../CodeMirror/addon/lint/lint';
import '../CodeMirror/addon/lint/yaml-lint';
import '../CodeMirror/addon/edit/closebrackets';
import '../CodeMirror/addon/fold/foldcode';
import '../CodeMirror/addon/fold/foldgutter';
import '../CodeMirror/addon/fold/indent-fold';
import '../CodeMirror/addon/selection/active-line';
import '../CodeMirror/addon/hint/show-hint';
import '../CodeMirror/addon/hint/yaml-hint';

/* ################### */
/* #### Variables #### */
/* ################### */

const fileLib = new FileLib(file, filename, cat, params);

/* ################### */
/* #### Functions #### */
/* ################### */

const initEvents = () => {
  // Click clone
  $('main').click((e) => {
    if (e.ctrlKey && fileLib.source.getSelection() === 'clone') {
      fileLib.onclickclone();
    }
  });

  // Ctrl+S
  $(document).on('keydown', (e) => {
    if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)  && e.keyCode == 83) {
      fileLib.onsave();
    }
  });

  // Toggle autosave
  $('#i-autosave').on('change', (e) => {
    fileLib.autosave = $(this).is(':checked');
  });

  // Toggle infos
  $('#info-but').click(e => {
    $("#infos").show();
  });
  $('#infos').click(e => {
    $("#infos").hide();
  });

  // Autosave on change
  fileLib.source.on('change', (e) => {
    if (!fileLib.autosave || !fileLib.hasReturn) return;
    fileLib.onsave();
  });

  // Add parameter
  $('*[param]').click(function () {
    fileLib.source.replaceSelection('{{ ' + $(this).attr('param') + ' }}');
  });

  // Save button
  $('#savebut').click(e => {
    fileLib.onsave();
  });
}

$(document).ready(() => {

  fileLib.onready();
  initEvents();
  accordion.initAccordionWithAnim();

});
