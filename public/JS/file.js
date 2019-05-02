let cansave = true;
let errors = false;
save = () => {
  if(!cansave || errors) return;
  cansave = false;
  document.getElementById('savebut').classList.add('disabled');
  var req = new XMLHttpRequest();
  req.open("POST", "/webapp/save");
  req.setRequestHeader("Content-Type", "application/json");
  req.onerror = function() {
    console.log("Échec de chargement ");
    cansave = true;
  };
  req.onload = function() {
    cansave = true;
    if (req.status === 200) {
      document.getElementById('savebut').classList.remove('disabled');
      console.log(req.responseText);
      console.log("Saved !");
    } else {
      console.log("Erreur " + req.status);
    }
  };
  console.log(source.getValue().replace(/\t/g, "  "));
  req.send(JSON.stringify({code: source.getValue().replace(/\t/g, "  "), file: filename, cat: cat, oldcode: file}));
}

addparameter = (param) => {
  source.replaceSelection('{{ ' + param + ' }}');
}

addentity = (entity) => {
  source.replaceSelection('{{  | ' + entity + ' }}');
  console.log(source.getCursor());
  let pos = source.getCursor();
  pos.ch -= (6 + entity.length);
  source.setCursor(pos);
  source.focus();
}

capitalize = (s) => {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

getFiles = () => {
  var req = new XMLHttpRequest();
  req.open("POST", "/webapp/getfiles");
  req.setRequestHeader("Content-Type", "application/json");
  req.onerror = function() {
    console.log("Échec de chargement ");
  };
  req.onload = function() {
    if (req.status === 200) {
      let types = JSON.parse(req.responseText);
      let container = document.getElementById("filecontainer");
      types.forEach(type => {
        let cat = document.createElement('span');
        cat.setAttribute('s-cat', type.name);
        cat.innerHTML += '<h2>' + capitalize(type.name) + '</h2>';

        container.appendChild(cat);
        if (type.response.length > 0) {
          let c = document.createElement('span');
          c.setAttribute('s-type', 'responses');
          c.innerHTML += "<h3>Responses</h3>";
          type.response.forEach(file => {
            c.innerHTML += '<a href="/webapp/' + type.name + '/response/' + file + '" s-val="' + file + '">' + capitalize(file) + '</a>';
          });
          cat.appendChild(c);
        }
        if (type.training.length > 0) {
          c = document.createElement('span');
          c.setAttribute('s-type', 'training');
          c.innerHTML += "<h3>Training</h3>";
          type.training.forEach(file => {
            c.innerHTML += '<a href="/webapp/' + type.name + '/training/' + file + '" s-val="' + file + '">' + capitalize(file) + '</a>';
          })
          cat.appendChild(c);
        }
      });
    } else {
      console.log("Erreur " + req.status);
    }
  };
  req.send(JSON.stringify({token: 'MmFJYmkWa1Qfg730c5gORJaEOTsBmXfw'}));

}

getEntities = () => {
  var req = new XMLHttpRequest();
  req.open("POST", "/webapp/getentities");
  req.setRequestHeader("Content-Type", "application/json");
  req.onerror = function() {
    console.log("Échec de chargement ");
  };
  req.onload = function() {
    if (req.status === 200) {
      let entities = JSON.parse(req.responseText);
      let container = document.getElementById("paramcontainer");
      params = entities;
      entities.forEach(entity => {
        container.innerHTML += "<strong onclick=\"addentity('" + entity + "')\" s-val='" + entity + "'>" + entity + "</strong>";
      });
    } else {
      console.log("Erreur " + req.status);
    }
  };
  req.send(JSON.stringify({token: 'MmFJYmkWa1Qfg730c5gORJaEOTsBmXfw'}));
}

window.addEventListener("load", () => {
  source = CodeMirror.fromTextArea(document.getElementById('editor'), {
    mode: 'yaml',
    lineNumbers: true,
    value: file,
    theme: 'default',
    gutters: ["CodeMirror-lint-markers"],
    lint: true,
    smartIndent: true,
    indentUnit: 2,
    tabSize: 2,
    lineWrapping: true,
    autocorrect: true,
  });
  source.setValue(file.replace(/  /g, "\t"));
  getFiles();
  document.getElementsByTagName('main')[0].addEventListener('click', function (e) {
    if (e.ctrlKey) {
      if (source.getSelection() === 'clone') {
        let line = source.getLine(source.getCursor().line);
        if (line.startsWith('clone')) {
          let place = line.split(':')[1].trim().replace(/"/g, "");
          let fold = place.split('.')[0];
          let file = place.split('.')[1];
          window.location.href = "/webapp/" + fold + "/response/" + file;
        }
      }
    }
  });
});

openinfos = () => {
  document.getElementById("infos").style.display = null;
}

closeinfos = () => {
  document.getElementById("infos").style.display = "none";
}
