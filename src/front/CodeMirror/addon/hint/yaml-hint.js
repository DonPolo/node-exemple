(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  var Pos = CodeMirror.Pos;
  const values = [
    'intent: ',
    'beautyname: ',
    'type: ',
    'desc: ',
    'responses:',
    'text:',
    'fr-tu:',
    'fr:',
    'fr-vous:',
    'fr-cond:',
    'fr-tu-cond:',
    'fr-vous-cond:',
    'media:',
    'value:',
    'link:',
    'alt:',
    'btn:',
    'dropdown:',
    'followupintent:',
    'sing:',
    'plur:',
    'masc:',
    'fem:',
    'sing-cond:',
    'plur-cond:',
    'masc-cond:',
    'fem-cond:',
  ]
  function yamlHint (editor, options) {
    var cur = editor.getCursor();

    var token = editor.getTokenAt(cur);
    var word = editor.findWordAt(cur);
    var line = editor.getLine(word.anchor.line);
    var realword = line.substring(word.anchor.ch, word.head.ch);

    let res = values.filter(v => v.startsWith(realword));
    return {list: res,
      from: word.anchor,
      to: word.head}
  }

  CodeMirror.registerHelper("hint", "yaml", yamlHint);
});
