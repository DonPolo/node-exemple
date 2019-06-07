import CodeMirror from 'codemirror';

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
];
function yamlHint(editor: any) {
  const cur = editor.getCursor();

  const word = editor.findWordAt(cur);
  const line = editor.getLine(word.anchor.line);
  const realword = line.substring(word.anchor.ch, word.head.ch);

  const res = values.filter(v => v.startsWith(realword));
  return { list: res, from: word.anchor, to: word.head };
}

CodeMirror.registerHelper('hint', 'yaml', yamlHint);
