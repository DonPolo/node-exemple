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
      console.log("Saved !");
    } else {
      console.log("Erreur " + req.status);
    }
  };
  req.send(JSON.stringify({code: source.getValue().replace(/\t/g, "  "), file: filename, cat: cat, oldcode: file}));
}

addparameter = (param) => {
  source.replaceSelection('{{ ' + param + ' }}');
}

addentity = (entity) => {
  source.replaceSelection('{{  | ' + entity + ' }}');
  let pos = source.getCursor();
  pos.ch -= (6 + entity.length);
  source.setCursor(pos);
  source.focus();
}

capitalize = (s) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

getFiles = () => {
  let container = document.getElementById("filecontainer");

  var req = new XMLHttpRequest();
  req.open("POST", "/webapp/getfiles");
  req.setRequestHeader("Content-Type", "application/json");
  req.onerror = function() {
    container.getElementsByTagName('div')[0].innerHTML = '<strong>Erreur de chargement</strong>';
    console.log("Échec de chargement ");
  };
  req.onload = function() {
    if (req.status === 200) {
      let types = JSON.parse(req.responseText);
      container.innerHTML = "<h2>Training</h2>";
      types.training.forEach(files => {
        files.files.forEach(f => {
          container.innerHTML += '<a href="/webapp/' + files.type + '/training/' + f + '" s-val="' + files.type + '.' + f + '">' + capitalize(files.type) + '.' + capitalize(f) + '</a>';
        });
      });
      container.innerHTML += "<h2>Responses</h2>";
      types.response.forEach(files => {
        files.files.forEach(f => {
          container.innerHTML += '<a href="/webapp/' + files.type + '/response/' + f + '" s-val="' + files.type + '.' + f + '">' + capitalize(files.type) + '.' + capitalize(f) + '</a>';
        });
      });
    } else {
      console.log("Erreur " + req.status);
      container.getElementsByTagName('div')[0].innerHTML = '<strong>Erreur de chargement</strong>';
    }
  };
  req.send(JSON.stringify({token: 'MmFJYmkWa1Qfg730c5gORJaEOTsBmXfw'}));

}

getEntities = () => {
  let container = document.getElementById("paramcontainer");
  var req = new XMLHttpRequest();
  req.open("POST", "/webapp/getentities");
  req.setRequestHeader("Content-Type", "application/json");
  req.onerror = function() {
    console.log("Échec de chargement ");
    container.getElementsByTagName('div')[0].innerHTML = '<strong>Erreur de chargement</strong>';
  };
  req.onload = function() {
    if (req.status === 200) {
      let entities = JSON.parse(req.responseText);
      params = entities;
      container.innerHTML = '<h2>Entities</h2>';
      entities.forEach(entity => {
        container.innerHTML += "<strong onclick=\"addentity('" + entity + "')\" s-val='" + entity + "'>" + entity + "</strong>";
      });
    } else {
      console.log("Erreur " + req.status);
      container.getElementsByTagName('div')[0].innerHTML = '<strong>Erreur de chargement</strong>';
    }
  };
  req.send(JSON.stringify({token: 'MmFJYmkWa1Qfg730c5gORJaEOTsBmXfw'}));
}

escapeNewLine = (text) => {
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
  source.setValue(escapeNewLine(file.replace(/  /g, "\t")));
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
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight){
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
});

openinfos = () => {
  document.getElementById("infos").style.display = null;
}

closeinfos = () => {
  document.getElementById("infos").style.display = "none";
}
