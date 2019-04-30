// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

function lintResponse (text, found) {
  let attrs = {
    names: ["intent", "type", "responses"],
    string: ["intent", "type"],
    array: ["responses"],
    found: [],
    curattr: null,
    curattrpos: -1,
    curattrgood: false,
    actualpos: [],
    responses: {
      desc: "string",
      text: {
        'fr-tu': [],
        'fr-vous': []
      },
      media: "string",
      link: "string",
      alt: {
        'fr-tu': [],
        'fr-vous': []
      },
      btn: {
        nextaction: "string",
        'fr-tu': [
          {
            'text': 'string',
            'value': 'string'
          }
        ],
        'fr-vous': [
          {
            'text': 'string',
            'value': 'string'
          }
        ]
      },
      dropdown: {
        nextaction: "string",
        'fr-tu': [
          {
            'text': 'string',
            'value': 'string'
          }
        ],
        'fr-vous': [
          {
            'text': 'string',
            'value': 'string'
          }
        ]
      }
    },
  }

  let lines = text.split("\n");

  let checkString = (l) => {
    let val = l.split(":")[1].trim();
    if(val === "" || val === "null") {
      return false;
    }
    return true;
  };

  let checkAllAttr = () => {
    let o = attrs[attrs.actualpos[0].name];
    for (let i = 1; i < attrs.actualpos.length; i++) {
      o = o[attrs.actualpos[i].name];
    }
    if (typeof o !== 'undefined') {
      if (typeof o !== 'string') {
        if (o instanceof Array && o.length === 0) {
          // String array
          if (attrs.actualpos[attrs.actualpos.length-1].found.length === 0) {
            found.push({message: "Attribute '" + attrs.actualpos[attrs.actualpos.length-1].name + "' must be an array and cannot be null", from: {ch: 0, line: attrs.actualpos[attrs.actualpos.length-1].pos}, to: {ch: 0, line: attrs.actualpos[attrs.actualpos.length-1].pos}, severity: "warning"});
          }
        } else if (o instanceof Array) {
          const keys = Object.keys(o[0]);
          let last = [];
          for (var j = 0; j < attrs.actualpos[attrs.actualpos.length-1].found.length; j++) {
            let val = attrs.actualpos[attrs.actualpos.length-1].found[j];
            if (keys.includes(val)) {
              if (last.includes(val)) {
                for (var key in o[0]) {
                  if (!last.includes(key)) {
                    found.push({message: "Missing attribute '" + key + "' for '" + attrs.actualpos[attrs.actualpos.length-1].name + "'", from: {ch: 0, line: attrs.actualpos[attrs.actualpos.length-1].pos}, to: {ch: 0, line: attrs.actualpos[attrs.actualpos.length-1].pos}, severity: "warning"});
                  }
                }
              } else {
                last.push(val);
              }
              if (last.length === keys.length) {
                last = [];
              }
            }
          }
        } else if (typeof o === 'object' && o !== null) {
          for(var key in o) {
            if (!attrs.actualpos[attrs.actualpos.length-1].found.includes(key)) {
              found.push({message: "Missing attribute '" + key + "' for '" + attrs.actualpos[attrs.actualpos.length-1].name + "'", from: {ch: 0, line: attrs.actualpos[attrs.actualpos.length-1].pos}, to: {ch: 0, line: attrs.actualpos[attrs.actualpos.length-1].pos}, severity: "warning"});
            }
          }
        }
      }
    }
    return 0;
  };

  let changePosition = (newpos, place) => {
    let k = 0;
    if (attrs.actualpos.length >= place) {
      let turn = attrs.actualpos.length-place;
      for (k = 0; k < turn; k++) {
        let a = checkAllAttr();
        attrs.actualpos.pop();
      }
    }
    if (newpos !== null && attrs.actualpos.length >= place) {
      attrs.actualpos.push(newpos);
    }
  }

  // On parcours toutes les lignes
  let i = 0;
  lines.forEach(l => {
    if (l.charAt(0) !== "" && l.charAt(0) !== " ") { // Attribute
      // Check old attribute
      if (attrs.curattr !== null && !attrs.curattrgood && attrs.curattr !== 'clone') {
        found.push({message: "Attribute '" + attrs.curattr + "' must be an array and cannot be null", from: {ch: 0, line: attrs.curattrpos}, to: {ch: attrs.curattr.length, line: attrs.curattrpos}, severity: "warning"});
        attrs.curattr = null;
      }

      // Check name
      let attr = l.split(":")[0];
      if (!attrs.names.includes(attr) && attr !== 'clone') {
        found.push({message: "Attribute '" + attr + "' doesn't exist in the current context", from: {ch: 0, line: i}, to: {ch: attr.length, line: i}, severity: "warning"});
      } else if (attrs.found.includes(attr)) {
        found.push({message: "Attribute '" + attr + "' already exists", from: {ch: 0, line: i}, to: {ch: attr.length, line: i}, severity: "warning"});
      } else {
        // Attribute name is good

        attrs.curattr = attr;
        attrs.curattrpos = i;
        attrs.curattrgood = false;
        attrs.actualpos = [{ name: attr, pos: i, found: [] }];
        attrs.found.push(attr);

        // Check type
        if (attrs.string.includes(attr)) {
          attrs.curattrgood = true;
          if(!checkString(l)) {
            found.push({message: "Attribute '" + attr + "' value must be a string (and cannot be null)", from: {ch: 0, line: i}, to: {ch: l.length, line: i}, severity: "warning"});
          }
        } else if (attrs.array.includes(attr)) {
          let val = l.split(":")[1].trim();
          if(val !== "") {
            found.push({message: "Attribute '" + attr + "' value must be an array", from: {ch: 0, line: i}, to: {ch: l.length, line: i}, severity: "warning"});
          }
        }
      }
    } else if (l.match(/^  - /g)) { // Array element directly in attribute
      // Check attribute
      if (attrs.curattr === null) {
        found.push({message: "Unexpected line", from: {ch: 0, line: i}, to: {ch: l.length, line: i}, severity: "warning"});
      } else if (attrs.string.includes(attrs.curattr)) {
        found.push({message: "Attribute '" + attrs.curattr + "' must be a string and cannot be an object or an array", from: {ch: 0, line: i}, to: {ch: l.length, line: i}, severity: "warning"});
      } else {
        if (attrs.array.includes(attrs.curattr)) {
          attrs.curattrgood = true;
        }
        let txt = l.substring(4, l.length);
        let name = txt.split(':')[0];
        let val = txt.split(':')[1];
        if (typeof attrs[attrs.curattr][name] === 'undefined') {
          found.push({message: "Unknown property '" + name + "' for '" + attrs.curattr + "'", from: {ch: 0, line: i}, to: {ch: l.length, line: i}, severity: "warning"});
          changePosition(null, 1);
        } else {
          if (typeof attrs[attrs.curattr][name] === 'string'){
            if (!checkString(l)) {
              found.push({message: "Property '" + name + "' for '" + attrs.curattr + "' must be a string", from: {ch: 0, line: i}, to: {ch: l.length, line: i}, severity: "warning"});
            }
          } else {
            if (checkString(l)) {
              found.push({message: "Property '" + name + "' for '" + attrs.curattr + "' cannot be a string", from: {ch: 0, line: i}, to: {ch: l.length, line: i}, severity: "warning"});
            }
          }
          attrs.actualpos[0].found.push(name);
          changePosition({ name, pos: i, found: [] }, 1);
        }
      }
    } else if (l.match(/^      [a-z,A-Z,"]/g)) { //  Element in element in attribute
      // Check attribute
      if (attrs.curattr === null) {
        found.push({message: "Unexpected line", from: {ch: 0, line: i}, to: {ch: l.length, line: i}, severity: "warning"});
      } else if (attrs.string.includes(attrs.curattr)) {
        found.push({message: "Attribute '" + attrs.curattr + "' must be a string and cannot be an object or an array", from: {ch: 0, line: i}, to: {ch: l.length, line: i}, severity: "warning"});
      } else if (!attrs.curattrgood && attrs.array.includes(attrs.curattr)) {
        found.push({message: "Attribute '" + attrs.curattr + "' must be an array", from: {ch: 0, line: i}, to: {ch: l.length, line: i}, severity: "warning"});
      } else {
        let txt = l.substring(6, l.length);
        let name = txt.split(':')[0];
        let val = txt.split(':')[1];
        if (attrs.actualpos.length < 2) {
          //found.push({message: "Unknown property '" + name + "' for '" + attrs.actualpos[1] + "'", from: {ch: 0, line: i}, to: {ch: l.length, line: i}, severity: "warning"});
        } else if (typeof attrs[attrs.curattr][attrs.actualpos[1].name][name] === 'undefined') {
          found.push({message: "Unknown property '" + name + "' for '" + attrs.actualpos[1].name + "'", from: {ch: 0, line: i}, to: {ch: l.length, line: i}, severity: "warning"});
        } else {
          if (typeof attrs[attrs.curattr][attrs.actualpos[1].name][name] === 'string'){
            if (!checkString(l)) {
              found.push({message: "Property '" + name + "' for '" + attrs.actualpos[1].name + "' must be a string", from: {ch: 0, line: i}, to: {ch: l.length, line: i}, severity: "warning"});
            }
          } else {
            if (checkString(l)) {
              found.push({message: "Property '" + name + "' for '" + attrs.actualpos[1].name + "' cannot be a string", from: {ch: 0, line: i}, to: {ch: l.length, line: i}, severity: "warning"});
            }
          }
          attrs.actualpos[1].found.push(name);
          changePosition({ name, pos: i, found: [] }, 2);
        }
      }
    } else if (l.match(/^        - /g)) { // Element in element in element in element in attribute
      // Check attribute
      if (attrs.curattr === null) {
        found.push({message: "Unexpected line", from: {ch: 0, line: i}, to: {ch: l.length, line: i}, severity: "warning"});
      } else if (attrs.string.includes(attrs.curattr)) {
        found.push({message: "Attribute '" + attrs.curattr + "' must be a string and cannot be an object or an array", from: {ch: 0, line: i}, to: {ch: l.length, line: i}, severity: "warning"});
      } else if (!attrs.curattrgood && attrs.array.includes(attrs.curattr)) {
        found.push({message: "Attribute '" + attrs.curattr + "' must be an array", from: {ch: 0, line: i}, to: {ch: l.length, line: i}, severity: "warning"});
      } else {
        let txt = l.substring(10, l.length);
        let name = txt.split(':')[0];
        let val = txt.split(':')[1];
        if (attrs.actualpos.length < 3) {
          //found.push({message: "Unknown property '" + name + "' for '" + attrs.actualpos[1] + "'", from: {ch: 0, line: i}, to: {ch: l.length, line: i}, severity: "warning"});
        } else if (!(attrs[attrs.curattr][attrs.actualpos[1].name][attrs.actualpos[2].name] instanceof Array)) {
          found.push({message: "Property '" + attrs.actualpos[2].name + "' cannot be an array", from: {ch: 0, line: i}, to: {ch: l.length, line: i}, severity: "warning"});
        } else {
          if (attrs[attrs.curattr][attrs.actualpos[1].name][attrs.actualpos[2].name].length === 0){
            if (txt.split(":").length > 1) {
              found.push({message: "Property of '" + attrs.actualpos[2].name + "' must be a string", from: {ch: 0, line: i}, to: {ch: l.length, line: i}, severity: "warning"});
            }
          } else {
            if(name === '') {

            } else if (typeof attrs[attrs.curattr][attrs.actualpos[1].name][attrs.actualpos[2].name][0][name] === 'undefined') {
              found.push({message: "Unknown property '" + name + "' for '" + attrs.actualpos[2].name + "'", from: {ch: 0, line: i}, to: {ch: l.length, line: i}, severity: "warning"});
            } else {
              if (typeof attrs[attrs.curattr][attrs.actualpos[1].name][attrs.actualpos[2].name][0][name] === 'string'){
                if (!checkString(l)) {
                  found.push({message: "Property '" + name + "' for '" + attrs.actualpos[2].name + "' must be a string", from: {ch: 0, line: i}, to: {ch: l.length, line: i}, severity: "warning"});
                }
              } else {
                if (checkString(l)) {
                  found.push({message: "Property '" + name + "' for '" + attrs.actualpos[2].name + "' cannot be a string", from: {ch: 0, line: i}, to: {ch: l.length, line: i}, severity: "warning"});
                }
              }
            }
          }
          attrs.actualpos[2].found.push(name);
          changePosition({ name, pos: i, found: [] }, 3);
        }
      }
    } else if (l.match(/^          [a-z,A-Z,"]/g)) { // Element in element in element in element in attribute
      // Check attribute
      if (attrs.curattr === null) {
        found.push({message: "Unexpected line", from: {ch: 0, line: i}, to: {ch: l.length, line: i}, severity: "warning"});
      } else if (attrs.string.includes(attrs.curattr)) {
        found.push({message: "Attribute '" + attrs.curattr + "' must be a string and cannot be an object or an array", from: {ch: 0, line: i}, to: {ch: l.length, line: i}, severity: "warning"});
      } else if (!attrs.curattrgood && attrs.array.includes(attrs.curattr)) {
        found.push({message: "Attribute '" + attrs.curattr + "' must be an array", from: {ch: 0, line: i}, to: {ch: l.length, line: i}, severity: "warning"});
      } else {
        let txt = l.substring(10, l.length);
        let name = txt.split(':')[0];
        let val = txt.split(':')[1];
        if (attrs.actualpos.length < 3) {
          //found.push({message: "Unknown property '" + name + "' for '" + attrs.actualpos[1] + "'", from: {ch: 0, line: i}, to: {ch: l.length, line: i}, severity: "warning"});
        } else if (!(attrs[attrs.curattr][attrs.actualpos[1].name][attrs.actualpos[2].name] instanceof Array)) {
          found.push({message: "Property '" + attrs.actualpos[2].name + "' cannot be an array", from: {ch: 0, line: i}, to: {ch: l.length, line: i}, severity: "warning"});
        } else {
          if (attrs[attrs.curattr][attrs.actualpos[1].name][attrs.actualpos[2].name].length === 0){
            if (txt.split(":").length > 1) {
              found.push({message: "Property of '" + attrs.actualpos[2].name + "' must be a string", from: {ch: 0, line: i}, to: {ch: l.length, line: i}, severity: "warning"});
            }
          } else {
            if(name === '') {

            } else if (typeof attrs[attrs.curattr][attrs.actualpos[1].name][attrs.actualpos[2].name][0][name] === 'undefined') {
              found.push({message: "Unknown property '" + name + "' for '" + attrs.actualpos[2] + "'", from: {ch: 0, line: i}, to: {ch: l.length, line: i}, severity: "warning"});
            } else {
              if (typeof attrs[attrs.curattr][attrs.actualpos[1].name][attrs.actualpos[2].name][0][name] === 'string'){
                if (!checkString(l)) {
                  found.push({message: "Property '" + name + "' for '" + attrs.actualpos[2].name + "' must be a string", from: {ch: 0, line: i}, to: {ch: l.length, line: i}, severity: "warning"});
                }
              } else {
                if (checkString(l)) {
                  found.push({message: "Property '" + name + "' for '" + attrs.actualpos[2].name + "' cannot be a string", from: {ch: 0, line: i}, to: {ch: l.length, line: i}, severity: "warning"});
                }
              }
            }
          }
          attrs.actualpos[2].found.push(name);
          changePosition({ name, pos: i, found: [] }, 3);
        }
      }
    } else {
      if(l != "") {
        found.push({message: "Unexpected line", from: {ch: 0, line: i}, to: {ch: l.length, line: i}, severity: "warning"});
      }
    }
    // Check attribute
    let a = l.indexOf('{{');
    let b = l.indexOf('}}', a);
    while (a !== -1 && b !== -1) {
      const txt = l.substring(a+2, b).trim();
      if (!params.includes(txt)) {
        found.push({message: "Parameter '" + txt + "' is not valid", from: {ch: a-4, line: i}, to: {ch: b-2, line: i}, severity: "warning"});
      }
      a = l.indexOf('{{', b);
      b = l.indexOf('}}', a);
    }
    i++;
  });

  attrs.names.forEach(a => {
    if (!attrs.found.includes(a)) {
      found.push({message: "Missing attribute '" + a + "'", from: {ch: 0, line: 0}, to: {ch: 0, line: 0}, severity: "warning"});
    }
  });

  return found;
}

function lintTraining (text, found) {
  let lines = text.split('\n');
  let i = 0;
  lines.forEach(l => {
    // Check entities
    let a = l.indexOf('{{');
    let b = l.indexOf('}}', a);
    while (a !== -1 && b !== -1) {
      let txt = l.substring(a+2, b).trim();
      if (txt.split('|')[0].trim() === '') {
        found.push({message: "Entity value is not set", from: {ch: a-1, line: i}, to: {ch: b+1, line: i}, severity: "warning"});
      }
      txt = txt.split('|')[1].trim();
      if (!params.includes(txt)) {
        found.push({message: "Entity '" + txt + "' is not valid", from: {ch: a-1, line: i}, to: {ch: b+1, line: i}, severity: "warning"});
      }
      a = l.indexOf('{{', b);
      b = l.indexOf('}}', a);
    }
    i++;
  });
  return found;
}


(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

  CodeMirror.registerHelper("lint", "yaml", function(text) {
    var found = [];
    text = text.replace(/\t/g, "  ");
    /* Syntax errors */
    let err = false;
    let nb = 0;
    do {
      err = false;
      try {
        YAML.parse(text);
      } catch (e) {
        err = true;
        if(typeof e.parsedLine === 'undefined') {
          found.push({message : e.message, from: {ch: 0, line: 0}, to: {ch: 0, line: 0}, severity: "error"});
          break;
        } else {
          let line = CodeMirror.Pos(e.parsedLine, 0).line;
          let lines = text.split("\n");
          let pos = lines[e.parsedLine-1].indexOf(e.snippet)
          found.push({message : e.message, from: {ch: pos, line: e.parsedLine-1+nb}, to: {ch: pos + e.snippet.length, line: e.parsedLine-1+nb}, severity: "error"});
          text = '';
          for (var j = 0; j < lines.length; j++) {
            if(j !== e.parsedLine-1) {
              text += lines[j] + "\n";
            }
          }
          nb++;
        }

      }
    } while(err && nb < 10);
    if (found.length === 0) {
      errsyntax = false;
    } else {
      errsyntax = true;
    }

    /* Json errors */
    if (cat === 'response') {
      found = lintResponse(text, found);
    } else {
      found = lintTraining(text, found);
    }

    return found;
  });

});
