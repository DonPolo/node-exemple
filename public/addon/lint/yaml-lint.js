// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

function checkJson (json) {
  let found = [];
  if(!json) return [];

  let line = -1;


  let check = (obj, must, mustnot, txt) => {
    must.forEach(m => {
      if (!obj[m]) {
        found.push({message: "Missing attribute '" + m + "' in '" + txt + "'", from: {line: line,ch:0}, to: {line: line, ch:0}});
      }
    });
    mustnot.forEach(m => {
      if (obj[m]) {
        found.push({message: "Unknown attribute '" + m + "' for '" + txt + "'", from: {line: line,ch:0}, to: {line: line, ch:0}});
      }
    });
  }

  let checkVars = (l, vars) => {
    let a = l.indexOf('[[');
    let b = l.indexOf(']]', a);
    while (a !== -1 && b !== -1) {
      const txt = l.substring(a+2, b).trim();
      if (!vars.includes(txt.split('.')[0]) && !vars.includes(txt.split('+')[0].trim()) && !vars.includes(txt.split('-')[0].trim()) && !vars.includes(txt.split('*')[0].trim()) && !vars.includes(txt.split('/')[0].trim())) {
        found.push({ message: "Parameter '" + txt.split('.')[0] + "' is not valid", from: {ch: 0, line: 0}, to: {ch: 0, line: 0} });
      }
      a = l.indexOf('[[', b);
      b = l.indexOf(']]', a);
    }
  }

  let checkTextForeach = (obj) => {
    if (obj instanceof Array) {
      obj.forEach(e => {
        let pos = e.indexOf("::foreach");
        if (pos > -1) {
          let txt = e.substring(0, pos).trim();
          let loop = e.substring(pos+9).trim();
          let parts = loop.split(' in ');
          if (parts.length !== 2) {
            found.push({message: "Malformed 'foreach' in text", from: {line: line,ch:0}, to: {line: line, ch:0}});
          } else {
            if (!params.includes(parts[1].trim())) {
              found.push({message: "Unknown parameter '" + parts[1].trim() + "' in 'foreach' in text", from: {line: line,ch:0}, to: {line: line, ch:0}});
            } else {
              if (parts[0].trim().split(',').length > 2) {
                found.push({message: "Malformed 'foreach' in text", from: {line: line,ch:0}, to: {line: line, ch:0}});
              } else {
                let vars = parts[0].trim().split(',');
                vars = vars.map(Function.prototype.call, String.prototype.trim);
                checkVars(txt, vars);
              }
            }
          }
        }
      });
    }
  }

  let checkCond = (obj, txt) => {
    let a;
    let good = false;
    if (!obj['cond']) {
      found.push({message: "Missing attribute '" + 'cond' + "' in '" + txt + "'", from: {line: line,ch:0}, to: {line: line, ch:0}});
    }
    // Default situation
    if (obj['sing']) {
      good = true;
      checkTextForeach(obj['sing']);
      if (!obj['plur'] && !obj['plur-cond']) {
        found.push({message: "Missing attribute '" + "plur' or 'plur-cond" + "' in '" + txt + "'", from: {line: line,ch:0}, to: {line: line, ch:0}});
      }
      check(obj, [], ['fem', 'masc', 'fem-cond', 'masc-cond', 'sing-cond'], txt);
    }
    if (obj['plur']) {
      good = true;
      checkTextForeach(obj['plur']);
      if (!obj['sing'] && !obj['sing-cond']) {
        found.push({message: "Missing attribute '" + "sing' or 'sing-cond" + "' in '" + txt + "'", from: {line: line,ch:0}, to: {line: line, ch:0}});
      }
      check(obj, [], ['fem', 'masc', 'fem-cond', 'masc-cond', 'plur-cond'], txt);
    }
    if (obj['fem']) {
      good = true;
      checkTextForeach(obj['fem']);
      if (!obj['masc'] && !obj['masc-cond']) {
        found.push({message: "Missing attribute '" + "masc' or 'masc-cond" + "' in '" + txt + "'", from: {line: line,ch:0}, to: {line: line, ch:0}});
      }
      check(obj, [], ['sing', 'plur', 'sing-cond', 'plur-cond', 'fem-cond'], txt);
    }
    if (obj['masc']) {
      good = true;
      checkTextForeach(obj['masc']);
      if (!obj['fem'] && !obj['fem-cond']) {
        found.push({message: "Missing attribute '" + "fem' or 'fem-cond" + "' in '" + txt + "'", from: {line: line,ch:0}, to: {line: line, ch:0}});
      }
      check(obj, [], ['sing', 'plur', 'sing-cond', 'plur-cond', 'masc-cond'], txt);
    }
    // Complex situation
    if (obj['sing-cond']) {
      good = true;
      if (!obj['plur'] && !obj['plur-cond']) {
        found.push({message: "Missing attribute '" + "plur' or 'plur-cond" + "' in '" + txt + "'", from: {line: line,ch:0}, to: {line: line, ch:0}});
      }
      check(obj, [], ['fem', 'masc', 'fem-cond', 'masc-cond', 'sing'], txt);
      a = obj['sing-cond'];
      if (!a['cond']) {
        found.push({message: "Missing attribute '" + 'cond' + "' in '" + 'sing-cond' + "'", from: {line: line,ch:0}, to: {line: line, ch:0}});
      }
      check(a, ['fem', 'masc'], ['sing', 'plur', 'sing-cond', 'plur-cond', 'fem-cond', 'masc-cond'], 'sing-cond');
      if (a['masc']) {
        checkTextForeach(a['masc']);
      }
      if (a['fem']) {
        checkTextForeach(a['fem']);
      }
    }
    if (obj['plur-cond']) {
      good = true;
      if (!obj['sing'] && !obj['sing-cond']) {
        found.push({message: "Missing attribute '" + "sing' or 'sing-cond" + "' in '" + txt + "'", from: {line: line,ch:0}, to: {line: line, ch:0}});
      }
      check(obj, [], ['fem', 'masc', 'fem-cond', 'masc-cond', 'plur'], txt);
      a = obj['plur-cond'];
      if (!a['cond']) {
        found.push({message: "Missing attribute '" + 'cond' + "' in '" + 'plur-cond' + "'", from: {line: line,ch:0}, to: {line: line, ch:0}});
      }
      check(a, ['fem', 'masc'], ['sing', 'plur', 'sing-cond', 'plur-cond', 'fem-cond', 'masc-cond'], 'plur-cond');
      if (a['masc']) {
        checkTextForeach(a['masc']);
      }
      if (a['fem']) {
        checkTextForeach(a['fem']);
      }
    }
    if (obj['fem-cond']) {
      good = true;
      if (!obj['masc'] && !obj['masc-cond']) {
        found.push({message: "Missing attribute '" + "masc' or 'masc-cond" + "' in '" + txt + "'", from: {line: line,ch:0}, to: {line: line, ch:0}});
      }
      check(obj, [], ['sing', 'plur', 'sing-cond', 'plur-cond', 'fem'], txt);
      a = obj['fem-cond'];
      if (!a['cond']) {
        found.push({message: "Missing attribute '" + 'cond' + "' in '" + 'fem-cond' + "'", from: {line: line,ch:0}, to: {line: line, ch:0}});
      }
      check(a, ['sing', 'plur'], ['masc', 'fem', 'sing-cond', 'plur-cond', 'fem-cond', 'masc-cond'], 'fem-cond');
      if (a['sing']) {
        checkTextForeach(a['sing']);
      }
      if (a['plur']) {
        checkTextForeach(a['plur']);
      }
    }
    if (obj['masc-cond']) {
      good = true;
      if (!obj['fem'] && !obj['fem-cond']) {
        found.push({message: "Missing attribute '" + "fem' or 'fem-cond" + "' in '" + txt + "'", from: {line: line,ch:0}, to: {line: line, ch:0}});
      }
      check(obj, [], ['sing', 'plur', 'sing-cond', 'plur-cond', 'masc'], txt);
      a = obj['masc-cond'];
      if (!a['cond']) {
        found.push({message: "Missing attribute '" + 'cond' + "' in '" + 'masc-cond' + "'", from: {line: line,ch:0}, to: {line: line, ch:0}});
      }
      check(a, ['sing', 'plur'], ['masc', 'fem', 'sing-cond', 'plur-cond', 'fem-cond', 'masc-cond'], 'masc-cond');
      if (a['sing']) {
        checkTextForeach(a['sing']);
      }
      if (a['plur']) {
        checkTextForeach(a['plur']);
      }
    }
    if(!good) {
      found.push({message: "Missing attributes in '" + txt + "'", from: {line: line,ch:0}, to: {line: line, ch:0}});
    }
  }

  let checkTextAttr = (t, allowCond = true) => {
    if (t['fr']) {
      check(t, [], ['fr-tu', 'fr-vous', 'fr-cond', 'fr-vous-cond', 'fr-tu-cond'], 'text');
      checkTextForeach(t['fr']);
    }
    if (t['fr-tu']) {
      check(t, ['fr-vous'], ['fr', 'fr-cond', 'fr-vous-cond', 'fr-tu-cond'], 'text');
      checkTextForeach(t['fr-tu']);
    }
    if (t['fr-vous']) {
      check(t, ['fr-tu'], ['fr', 'fr-cond', 'fr-vous-cond', 'fr-tu-cond'], 'text');
      checkTextForeach(t['fr-vous']);
    }
    if (allowCond) {
      if (t['fr-cond']) {
        checkCond(t['fr-cond'], 'fr-cond');
      }
      if (t['fr-tu-cond']) {
        checkCond(t['fr-tu-cond'], 'fr-tu-cond');
      }
      if (t['fr-vous-cond']) {
        checkCond(t['fr-vous-cond'], 'fr-vous-cond');
      }
    }
  }

  let checkBtnOrDD = (b) => {
    let used = [];
    if (b['fr']) {
      used.push('fr');
      check(b, [], ['fr-tu', 'fr-vous', 'fr-cond', 'fr-vous-cond', 'fr-tu-cond'], b.btn ? 'btn' : 'dropdown');
      if (b['fr'] instanceof Array) {
        b['fr'].forEach(e => {
          if (!e.text) {
            found.push({message: "Missing 'text' in 'fr'", from: {line: 0, ch:0}, to: {line: 0, ch: 0}, severity: 'warning'});
          } else {
            checkTextForeach([e.text]);
          }
          if (!e.value) {
            found.push({message: "Missing 'value' in 'fr'", from: {line: 0, ch:0}, to: {line: 0, ch: 0}, severity: 'warning'});
          }
          if (!e.followupintent) {
            found.push({message: "Missing 'followupintent' in 'fr'", from: {line: 0, ch:0}, to: {line: 0, ch: 0}, severity: 'warning'});
          }
        });
      }
    }
    if (b['fr-tu']) {
      used.push('fr-tu');
      check(b, ['fr-vous'], ['fr', 'fr-cond', 'fr-vous-cond', 'fr-tu-cond'], b.btn ? 'btn' : 'dropdown');
      if (b['fr-tu'] instanceof Array) {
        b['fr-tu'].forEach(e => {
          if (!e.text) {
            found.push({message: "Missing 'text' in 'fr-tu'", from: {line: 0, ch:0}, to: {line: 0, ch: 0}, severity: 'warning'});
          } else {
            checkTextForeach([e.text]);
          }
          if (!e.value) {
            found.push({message: "Missing 'value' in 'fr-tu'", from: {line: 0, ch:0}, to: {line: 0, ch: 0}, severity: 'warning'});
          }
          if (!e.followupintent) {
            found.push({message: "Missing 'followupintent' in 'fr'", from: {line: 0, ch:0}, to: {line: 0, ch: 0}, severity: 'warning'});
          }
        });
      }
    }
    if (b['fr-vous']) {
      used.push('fr-vous');
      check(b, ['fr-tu'], ['fr', 'fr-cond', 'fr-vous-cond', 'fr-tu-cond'], b.btn ? 'btn' : 'dropdown');
      if (b['fr-vous'] instanceof Array) {
        b['fr-vous'].forEach(e => {
          if (!e.text) {
            found.push({message: "Missing 'text' in 'fr-vous'", from: {line: 0, ch:0}, to: {line: 0, ch: 0}, severity: 'warning'});
          } else {
            checkTextForeach([e.text]);
          }
          if (!e.value) {
            found.push({message: "Missing 'value' in 'fr-vous'", from: {line: 0, ch:0}, to: {line: 0, ch: 0}, severity: 'warning'});
          }
          if (!e.followupintent) {
            found.push({message: "Missing 'followupintent' in 'fr'", from: {line: 0, ch:0}, to: {line: 0, ch: 0}, severity: 'warning'});
          }
        });
      }
    }
    if (b['alt']) {
      checkTextAttr(b['alt'], false);
    }

    if (b['foreach']) {
      // Check foreach cond
      let parts = b['foreach'].split(' in ');
      if (parts.length !== 2) {
        found.push({message: "Malformed 'foreach'", from: {line: line,ch:0}, to: {line: line, ch:0}});
      } else {
        if (!params.includes(parts[1].trim())) {
          found.push({message: "Unknown parameter '" + parts[1].trim() + "' in 'foreach'", from: {line: line,ch:0}, to: {line: line, ch:0}});
        } else {
          if (parts[0].trim().split(',').length > 2) {
            found.push({message: "Malformed 'foreach'", from: {line: line,ch:0}, to: {line: line, ch:0}});
          } else {
            let vars = parts[0].trim().split(',');
            vars = vars.map(Function.prototype.call, String.prototype.trim);
            used.forEach(u => {
              if (b[u] instanceof Array) {
                if(b[u].length > 0) {
                  let elem = b[u][0];
                  if(elem.text) {
                    checkVars(elem.text, vars);
                  }
                  if (elem.value) {
                    checkVars(elem.value, vars);
                  }
                  if (elem.followupintent) {
                    checkVars(elem.followupintent, vars);
                  }
                }
              }
            });
          }
        }
      }
    }
  }

  let browseObject = (obj, parent) => {
    line++;
    if (parent === 'responses' && obj.text) {
      checkTextAttr(obj.text);
    }
    if (parent === 'responses' && obj.dropdown) {
      checkBtnOrDD(obj.dropdown);
    }
    if (parent === 'responses' && obj.btn) {
      checkBtnOrDD(obj.btn);
    }
    if (obj instanceof Array) {
      obj.forEach(e => {
        if(typeof e === 'object') {
          line--;
        }
        browseObject(e, parent);
      });
    } else if (typeof obj === 'object' && obj !== null) {
      for(let key in obj) {
        browseObject(obj[key], key);
      }
    }
  }
  browseObject(json, 'all');

  /*let texts = json.responses.filter(u => u.text);
  texts.forEach(te => {
    let t = te.text
    checkTextAttr(t);
  });*/

  /*let btndd = json.responses.filter(u => u.btn || u.dropdown);
  btndd.forEach(b => {
    if (b.btn) {
      b = b.btn;
    } else {
      b = b.dropdown;
    }
    checkBtnOrDD(b);

  });*/
  return found;
}

function lintResponse (text, found, json) {
  if (params.length === 0) return found;
  if (found.length === 0) {
    found = checkJson(json);
  }
  let attrs = {
    names: ["intent", "type", "responses", "beautyname", "desc"],
    string: ["intent", "type", "beautyname", "desc"],
    array: ["responses"],
    found: [],
    curattr: null,
    curattrpos: -1,
    curattrgood: false,
    actualpos: [],
    responses: {
      text: {
        '?fr-tu': [],
        '?fr-vous': [],
        '?fr': [],
        '?fr-tu-cond': {
          'cond': 'string',
          '?sing': [],
          '?plur': [],
          '?fem': [],
          '?masc': [],
          '?sing-cond': {
            'cond': 'string',
            'masc': [],
            'fem': []
          },
          '?plur-cond': {
            'cond': 'string',
            'masc': [],
            'fem': []
          },
          '?fem-cond': {
            'cond': 'string',
            'sing': [],
            'plur': []
          },
          '?masc-cond': {
            'cond': 'string',
            'sing': [],
            'plur': []
          },
        },
        '?fr-vous-cond': {
          'cond': 'string',
          '?sing': [],
          '?plur': [],
          '?fem': [],
          '?masc': [],
          '?sing-cond': {
            'cond': 'string',
            'masc': [],
            'fem': []
          },
          '?plur-cond': {
            'cond': 'string',
            'masc': [],
            'fem': []
          },
          '?fem-cond': {
            'cond': 'string',
            'sing': [],
            'plur': []
          },
          '?masc-cond': {
            'cond': 'string',
            'sing': [],
            'plur': []
          },
        },
        '?fr-cond': {
          'cond': 'string',
          '?sing': [],
          '?plur': [],
          '?fem': [],
          '?masc': [],
          '?sing-cond': {
            'cond': 'string',
            'masc': [],
            'fem': []
          },
          '?plur-cond': {
            'cond': 'string',
            'masc': [],
            'fem': []
          },
          '?fem-cond': {
            'cond': 'string',
            'sing': [],
            'plur': []
          },
          '?masc-cond': {
            'cond': 'string',
            'sing': [],
            'plur': []
          },
        }
      },
      media: {
        value: "string",
        '?alt': {
          '?fr-tu': [],
          '?fr-vous': [],
          '?fr': [],
          '?fr-tu-cond': {
            'cond': 'string',
            '?sing': [],
            '?plur': [],
            '?fem': [],
            '?masc': [],
            '?sing-cond': {
              'cond': 'string',
              'masc': [],
              'fem': []
            },
            '?plur-cond': {
              'cond': 'string',
              'masc': [],
              'fem': []
            },
            '?fem-cond': {
              'cond': 'string',
              'sing': [],
              'plur': []
            },
            '?masc-cond': {
              'cond': 'string',
              'sing': [],
              'plur': []
            },
          },
          '?fr-vous-cond': {
            'cond': 'string',
            '?sing': [],
            '?plur': [],
            '?fem': [],
            '?masc': [],
            '?sing-cond': {
              'cond': 'string',
              'masc': [],
              'fem': []
            },
            '?plur-cond': {
              'cond': 'string',
              'masc': [],
              'fem': []
            },
            '?fem-cond': {
              'cond': 'string',
              'sing': [],
              'plur': []
            },
            '?masc-cond': {
              'cond': 'string',
              'sing': [],
              'plur': []
            },
          },
          '?fr-cond': {
            'cond': 'string',
            '?sing': [],
            '?plur': [],
            '?fem': [],
            '?masc': [],
            '?sing-cond': {
              'cond': 'string',
              'masc': [],
              'fem': []
            },
            '?plur-cond': {
              'cond': 'string',
              'masc': [],
              'fem': []
            },
            '?fem-cond': {
              'cond': 'string',
              'sing': [],
              'plur': []
            },
            '?masc-cond': {
              'cond': 'string',
              'sing': [],
              'plur': []
            },
          }
        },
      },
      link: {
        value: "string",
        '?alt': {
          '?fr-tu': [],
          '?fr-vous': [],
          '?fr': [],
          '?fr-tu-cond': {
            'cond': 'string',
            '?sing': [],
            '?plur': [],
            '?fem': [],
            '?masc': [],
            '?sing-cond': {
              'cond': 'string',
              'masc': [],
              'fem': []
            },
            '?plur-cond': {
              'cond': 'string',
              'masc': [],
              'fem': []
            },
            '?fem-cond': {
              'cond': 'string',
              'sing': [],
              'plur': []
            },
            '?masc-cond': {
              'cond': 'string',
              'sing': [],
              'plur': []
            },
          },
          '?fr-vous-cond': {
            'cond': 'string',
            '?sing': [],
            '?plur': [],
            '?fem': [],
            '?masc': [],
            '?sing-cond': {
              'cond': 'string',
              'masc': [],
              'fem': []
            },
            '?plur-cond': {
              'cond': 'string',
              'masc': [],
              'fem': []
            },
            '?fem-cond': {
              'cond': 'string',
              'sing': [],
              'plur': []
            },
            '?masc-cond': {
              'cond': 'string',
              'sing': [],
              'plur': []
            },
          },
          '?fr-cond': {
            'cond': 'string',
            '?sing': [],
            '?plur': [],
            '?fem': [],
            '?masc': [],
            '?sing-cond': {
              'cond': 'string',
              'masc': [],
              'fem': []
            },
            '?plur-cond': {
              'cond': 'string',
              'masc': [],
              'fem': []
            },
            '?fem-cond': {
              'cond': 'string',
              'sing': [],
              'plur': []
            },
            '?masc-cond': {
              'cond': 'string',
              'sing': [],
              'plur': []
            },
          }
        },
      },
      btn: {
        '?foreach': 'string',
        '?fr-tu': [
          {
            'text': 'string',
            'value': 'string',
            'followupintent': 'string',
          }
        ],
        '?fr-vous': [
          {
            'text': 'string',
            'value': 'string',
            'followupintent': 'string',
          }
        ],
        '?fr': [
          {
            'text': 'string',
            'value': 'string',
            'followupintent': 'string',
          }
        ],
        '?alt': {
          '?fr-tu': [],
          '?fr-vous': [],
          '?fr': [],
          '?fr-tu-cond': {
            'cond': 'string',
            '?sing': [],
            '?plur': [],
            '?fem': [],
            '?masc': [],
            '?sing-cond': {
              'cond': 'string',
              'masc': [],
              'fem': []
            },
            '?plur-cond': {
              'cond': 'string',
              'masc': [],
              'fem': []
            },
            '?fem-cond': {
              'cond': 'string',
              'sing': [],
              'plur': []
            },
            '?masc-cond': {
              'cond': 'string',
              'sing': [],
              'plur': []
            },
          },
          '?fr-vous-cond': {
            'cond': 'string',
            '?sing': [],
            '?plur': [],
            '?fem': [],
            '?masc': [],
            '?sing-cond': {
              'cond': 'string',
              'masc': [],
              'fem': []
            },
            '?plur-cond': {
              'cond': 'string',
              'masc': [],
              'fem': []
            },
            '?fem-cond': {
              'cond': 'string',
              'sing': [],
              'plur': []
            },
            '?masc-cond': {
              'cond': 'string',
              'sing': [],
              'plur': []
            },
          },
          '?fr-cond': {
            'cond': 'string',
            '?sing': [],
            '?plur': [],
            '?fem': [],
            '?masc': [],
            '?sing-cond': {
              'cond': 'string',
              'masc': [],
              'fem': []
            },
            '?plur-cond': {
              'cond': 'string',
              'masc': [],
              'fem': []
            },
            '?fem-cond': {
              'cond': 'string',
              'sing': [],
              'plur': []
            },
            '?masc-cond': {
              'cond': 'string',
              'sing': [],
              'plur': []
            },
          }
        },
      },
      dropdown: {
        '?foreach': 'string',
        '?fr-tu': [
          {
            'text': 'string',
            'value': 'string',
            'followupintent': 'string'
          }
        ],
        '?fr-vous': [
          {
            'text': 'string',
            'value': 'string',
            'followupintent': 'string'
          }
        ],
        '?fr': [
          {
            'text': 'string',
            'value': 'string',
            'followupintent': 'string'
          }
        ],
        '?alt': {
          '?fr-tu': [],
          '?fr-vous': [],
          '?fr': [],
          '?fr-tu-cond': {
            'cond': 'string',
            '?sing': [],
            '?plur': [],
            '?fem': [],
            '?masc': [],
            '?sing-cond': {
              'cond': 'string',
              'masc': [],
              'fem': []
            },
            '?plur-cond': {
              'cond': 'string',
              'masc': [],
              'fem': []
            },
            '?fem-cond': {
              'cond': 'string',
              'sing': [],
              'plur': []
            },
            '?masc-cond': {
              'cond': 'string',
              'sing': [],
              'plur': []
            },
          },
          '?fr-vous-cond': {
            'cond': 'string',
            '?sing': [],
            '?plur': [],
            '?fem': [],
            '?masc': [],
            '?sing-cond': {
              'cond': 'string',
              'masc': [],
              'fem': []
            },
            '?plur-cond': {
              'cond': 'string',
              'masc': [],
              'fem': []
            },
            '?fem-cond': {
              'cond': 'string',
              'sing': [],
              'plur': []
            },
            '?masc-cond': {
              'cond': 'string',
              'sing': [],
              'plur': []
            },
          },
          '?fr-cond': {
            'cond': 'string',
            '?sing': [],
            '?plur': [],
            '?fem': [],
            '?masc': [],
            '?sing-cond': {
              'cond': 'string',
              'masc': [],
              'fem': []
            },
            '?plur-cond': {
              'cond': 'string',
              'masc': [],
              'fem': []
            },
            '?fem-cond': {
              'cond': 'string',
              'sing': [],
              'plur': []
            },
            '?masc-cond': {
              'cond': 'string',
              'sing': [],
              'plur': []
            },
          }
        },
      }
    },
  }

  let lines = text.split("\n");
  let i = 0;

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
            console.log('3')
            found.push({message: "Attribute '" + attrs.actualpos[attrs.actualpos.length-1].name + "' must be an array and cannot be null", from: {ch: 0, line: attrs.actualpos[attrs.actualpos.length-1].pos}, to: {ch: 0, line: attrs.actualpos[attrs.actualpos.length-1].pos}, severity: "warning"});
          }
        } else if (o instanceof Array) {
          const keys = Object.keys(o[0]);
          let last = [];
          let count = attrs.actualpos[attrs.actualpos.length-1].found.length;
          for (var j = 0; j < count; j++) {
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
            if (!key.startsWith('?')) {
              if (!attrs.actualpos[attrs.actualpos.length-1].found.includes(key)) {
                found.push({message: "Missing attribute '" + key + "' for '" + attrs.actualpos[attrs.actualpos.length-1].name + "'", from: {ch: 0, line: attrs.actualpos[attrs.actualpos.length-1].pos}, to: {ch: 0, line: attrs.actualpos[attrs.actualpos.length-1].pos}, severity: "warning"});
              }
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

  let addWarning = (message, from, to) => {
    if(!from) {
      console.log(message);
    }
    found.push({message, from, to, severity: 'warning'});
  }

  let lookForColumn = (text) => {
    let parts = [];
    let a = text.indexOf('"');
    let oldb = 0;
    while (a > -1) {
      if (a == 0 || text.charAt(a - 1) != '\\') {
        if (a != oldb) {
          parts.push(text.substring(oldb, a));
        }
        let b = text.indexOf('"', a+1);
        while(b > -1 && text.charAt(b-1) == '\\') {
          b = text.indexOf('"', b+1);
        }
        if (b > -1) {
          parts.push(text.substring(a, b+1));
          oldb = b + 1;
          a = text.indexOf('"', b+1);
        } else {
          a = -1;
        }
      } else {
        a = text.indexOf('"', a+1);
      }
    }
    if (parts.length > 1) {
      return false;
    }
    return true;
  }

  let checkName = (pos, l) => {
    let split = l.split(':');
    let name = '';
    let val = '';
    if (split.length === 1) {
      val = split[0];
    } else {
      name = split[0];
      split.shift();
      val = split.join('');
    }
    name = name.trim();
    val = val.trim();
    if (val.length > 0 && val.charAt(0) == "'") {
      addWarning("The character ' is forbidden as a delimiter use \" instead", {ch: 0, line: i}, {ch: l.length, line: i});
    }

    if (pos === 0) {
      // Attribute
      if (!attrs.names.includes(name) && name !== 'clone') {
        addWarning("Attribute '" + name + "' doesn't exist in the current context", {ch: 0, line: i}, {ch: name.length, line: i});
        return false;
      } else if (attrs.found.includes(name)) {
        addWarning("Attribute '" + name + "' already exists", {ch: 0, line: i}, {ch: name.length, line: i});
        return false;
      } else {
        attrs.curattr = name;
        attrs.curattrpos = i;
        attrs.curattrgood = false;
        attrs.actualpos = [{ name, pos: i, found: [] }];
        attrs.found.push(name);
      }
    } else {
      if (attrs.actualpos.length < pos) {
        return false;
      }
      let a = attrs;
      for (let j = 0; j < pos; j++) {
        a = a[attrs.actualpos[j].name];
      }
      if (a instanceof Array) {
        if (a.length === 0){
          if (!lookForColumn(l)) {
            addWarning("Property of '" + attrs.actualpos[pos-1].name + "' must be an array", {ch: 0, line: i}, {ch: l.length, line: i});
          }
          attrs.actualpos[pos-1].found.push(name);
          changePosition({ name, pos: i, found: [] }, pos);
          return true;
        }
        a = a[0];
      }
      if (name === '') {

      } else if (typeof a[name] === 'undefined' && typeof a['?' + name] === 'undefined') {
        addWarning("Unknown property '" + name + "' for '" + attrs.actualpos[pos-1].name + "'", {ch: 0, line: i}, {ch: l.length, line: i});
        return false;
      } else {
        if (typeof a[name] === 'string' || typeof a['?' + name] === 'string') {
          if (!checkString(l)) {
            addWarning("Property '" + name + "' for '" + attrs.actualpos[pos-1].name + "' must be a string", {ch: 0, line: i}, {ch: l.length, line: i});
          }
        } else {
          if (checkString(l)) {
            addWarning("Property '" + name + "' for '" + attrs.actualpos[pos-1].name + "' cannot be a string", {ch: 0, line: i}, {ch: l.length, line: i});
          }
        }
        if(!a[name]) {
          name = '?' + name;
        }
        attrs.actualpos[pos-1].found.push(name);
        changePosition({ name, pos: i, found: [] }, pos);
      }
    }

    return true;
  }

  let checkAttribute = (pos, l) => {
    if (pos === 0) {
      if (attrs.curattr !== null && !attrs.curattrgood && attrs.curattr !== 'clone') {
        addWarning("Attribute '" + attrs.curattr + "' must be an array and cannot be null", {ch: 0, line: attrs.curattrpos}, {ch: attrs.curattr.length, line: attrs.curattrpos});
        attrs.curattr = null;
        return false;
      }
    } else {
      if (attrs.curattr === null) {
        addWarning("Unexpected line", {ch: 0, line: i}, {ch: l.length, line: i});
        return false;
      } else if (attrs.string.includes(attrs.curattr)) {
        addWarning("Attribute '" + attrs.curattr + "' must be a string and cannot be an object or an array", {ch: 0, line: i}, {ch: l.length, line: i});
        return false;
      }
      if (pos > 1) {
        if (!attrs.curattrgood && attrs.array.includes(attrs.curattr)) {
          addWarning("Attribute '" + attrs.curattr + "' must be an array and cannot be null", {ch: 0, line: i}, {ch: l.length, line: i});
          return false;
        }
      } else {
        if (attrs.array.includes(attrs.curattr)) {
          attrs.curattrgood = true;
        }
      }
    }

    return true;
  }

  let checkParameters = (l) => {
    let a = l.indexOf('{{');
    let b = l.indexOf('}}', a);
    while (a !== -1 && b !== -1) {
      const txt = l.substring(a+2, b).trim();
      if (!params.includes(txt)) {
        addWarning("Parameter '" + txt + "' is not valid", {ch: a-4, line: i}, {ch: b-2, line: i});
      }
      a = l.indexOf('{{', b);
      b = l.indexOf('}}', a);
    }
  }

  // On parcours toutes les lignes
  let lastwasarray = false;
  lines.forEach(l => {
    if (l.match(/^[a-zA-Z0-9]/g)) { // Attribute
      lastwasarray = false;
      // Check old attribute
      checkAttribute(0, l);

      // Check name
      if (checkName(0, l, i)) {
        // Attribute name is good
        // Check type
        let attr = l.split(':')[0];
        if (attrs.string.includes(attr)) {
          attrs.curattrgood = true;
          if(!checkString(l)) {
            addWarning("Attribute '" + attr + "' value must be a string (and cannot be null)", {ch: 0, line: i}, {ch: l.length, line: i});
          }
        } else if (attrs.array.includes(attr)) {
          let val = l.split(":")[1].trim();
          if(val !== "") {
            addWarning("Attribute '" + attr + "' value must be an array", {ch: 0, line: i}, {ch: l.length, line: i});
          }
        }
      }
    } else if (l.match(/^  - /g) && checkAttribute(1, l)) { // Array element directly in attribute
      lastwasarray = true;
      let txt = l.substring(4, l.length);
      if (!checkName(1, txt)) {
        changePosition(null, 1);
      }
    } else if (l.match(/^      [a-zA-Z"]/g) && checkAttribute(2, l)) { //  Element in element in attribute
      lastwasarray = false;
      let txt = l.substring(6, l.length);
      checkName(2, txt);
    } else if (l.match(/^        - /g) && checkAttribute(3, l)) { // Element in element in element in element in attribute
      lastwasarray = true;
      let txt = l.substring(10, l.length);
      checkName(3, txt);
    } else if (l.match(/^          [a-zA-Z"]/g) && checkAttribute(4, l)) { // Element in element in element in element in attribute
      let txt = l.substring(10, l.length);
      if (lastwasarray) {
        checkName(3, txt);
      } else {
        checkName(4, txt);
      }
    } else if (l.match(/^        [a-zA-Z"]/g) && checkAttribute(3, l)) { // Element in element in element in element in attribute
      lastwasarray = false;
      let txt = l.substring(8, l.length);
      checkName(3, txt);
    } else if (l.match(/^          - /g) && checkAttribute(4, l)) { // Element in element in element in element in attribute
      lastwasarray = true;
      let txt = l.substring(12, l.length);
      checkName(4, txt);
    } else if (l.match(/^            - /g) && checkAttribute(5, l)) { // Element in element in element in element in attribute
      let txt = l.substring(14, l.length);
      checkName(5, txt);
    } else {
      if(l !== '') {
        addWarning('Unexpected line', {ch: 0, line: i}, {ch: l.length, line: i});
      }
    }
    // Check parameters
    checkParameters(l);
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
  if(params.length === 0) return found;
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
    let json;
    do {
      err = false;
      try {
        json = YAML.parse(text);
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
      found = lintResponse(text, found, json);
    } else {
      found = lintTraining(text, found);
    }
    if (found.length > 0) {
      document.getElementById('savebut').classList.add('errors');
      errors = true;
    } else {
      document.getElementById('savebut').classList.remove('errors');
      errors = false;
    }
    return found;
  });

});
