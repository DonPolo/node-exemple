function simplesearch (search) {
  let input = search.getElementsByTagName("input")[0];
  let container = document.getElementById(search.getAttribute('s-con'));

  actualize = () => {
    let val = input.value.toLowerCase();
    container.querySelectorAll("*[s-val]").forEach(e => {
      if (val === '') {
        e.style.display = null;
      } else {
        let elemval = e.getAttribute("s-val").toLowerCase();
        if (elemval.startsWith(val)) {
          e.style.display = null;
        } else {
          if (elemval.includes('.') && elemval.split('.')[1].startsWith(val)) {
            e.style.display = null;
          } else {
            e.style.display = 'none';
          }
        }
      }
    });
  }

  // Event
  input.addEventListener("input", actualize);
}

function complexsearch (search) {
  let input = search.getElementsByTagName('input')[0];
  let container = document.getElementById(search.getAttribute('s-con'));

  actualize = () => {
    let val = input.value.toLowerCase();
    container.querySelectorAll('*[s-cat]').forEach(e => {
      e.style.display = null;
    });
    container.querySelectorAll('*[s-type]').forEach(e => {
      e.style.display = null;
    });
    container.querySelectorAll('*[s-val]').forEach(e => {
      e.style.display = null;
    });
    if (val === 'responses' || val === 'training') {
      container.querySelectorAll('*[s-type]').forEach(e => {
        if(e.getAttribute('s-type') !== val) {
          e.style.display = 'none';
        }
      });
    } else {
      if (val.includes('.')) {
        let vals = val.split('.');
        container.querySelectorAll('*[s-cat]').forEach(e => {
          if (!e.getAttribute('s-cat').toLowerCase().trim().startsWith(vals[0])) {
            e.style.display = 'none';
          }
        });
        if (vals[1] === 'responses' || vals[1] === 'training') {
          container.querySelectorAll('*[s-type]').forEach(e => {
            if(e.getAttribute('s-type') !== vals[1]) {
              e.style.display = 'none';
            }
          });

          if (vals.length > 2) {
            container.querySelectorAll('*[s-val]').forEach(e => {
              if (!e.getAttribute('s-val').toLowerCase().trim().startsWith(vals[2])) {
                e.style.display = 'none';
              }
            });
          }
        } else {
          container.querySelectorAll('*[s-val]').forEach(e => {
            if (!e.getAttribute('s-val').toLowerCase().trim().startsWith(vals[1])) {
              e.style.display = 'none';
            }
          });
        }
      } else {
        container.querySelectorAll('*[s-cat]').forEach(e => {
          if (!e.getAttribute('s-cat').toLowerCase().trim().startsWith(val)) {
            e.style.display = 'none';
          }
        });
      }
    }
  }

  input.addEventListener('input', actualize);
}

window.addEventListener("load", () => {
  document.querySelectorAll("*[search='simple']").forEach(search => {
    simplesearch(search);
  });

  document.querySelectorAll("*[search='complex']").forEach(search => {
    complexsearch(search);
  });

});
