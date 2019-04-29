let cansave = true;
save = () => {
  if(!cansave) return;
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
  req.send(JSON.stringify({code: source.getValue().replace(/\t/g, "  "), file: filename, cat: cat}));
}

addparameter = (param) => {
  source.replaceSelection('{{ ' + param + ' }}');
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
        container.innerHTML += "<h2>" + capitalize(type.name) + "</h2>";
        container.innerHTML += "<h3>Responses</h3>";
        type.response.forEach(file => {
          container.innerHTML += '<a href="/webapp/' + type.name + '/response/' + file + '">' + capitalize(file) + '</a>';
        });
        container.innerHTML += "<h3>Training</h3>";
        type.training.forEach(file => {
          container.innerHTML += '<a href="/webapp/' + type.name + '/training/' + file + '">' + capitalize(file) + '</a>';
        })
      });
      console.log(req.responseText);
    } else {
      console.log("Erreur " + req.status);
    }
  };
  req.send(JSON.stringify({token: 'MmFJYmkWa1Qfg730c5gORJaEOTsBmXfw'}));

}

window.addEventListener("load", () => {
});
