window.addEventListener("load", () => {
  let search = document.querySelectorAll("*[search]")[0];
  let input = search.getElementsByTagName("input")[0];

  actualize = () => {
    let val = input.value.toLowerCase();
    console.log("actu")
    document.querySelectorAll("*[s-val]").forEach(e => {
      if (val === '') {
        e.style.display = null;
      } else {
        let elemval = e.getAttribute("s-val").toLowerCase();
        if (elemval.startsWith(val)) {
          e.style.display = null;
        } else {
          e.style.display = 'none';
        }
      }
    });
  }

  // Event
  input.addEventListener("input", actualize);

  if(search.getAttribute("search") === "simple") {
    // Simple search

  } else {
    // Complicate search
  }

});
