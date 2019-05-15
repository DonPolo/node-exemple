/* ################# */
/* #### Imports #### */
/* ################# */

// Some style
import '../SASS/analytics.sass';

// Some libs
import accordion from './lib/accordion';

// JQuery Obviously
import $ from './lib/jquery';

/* ################### */
/* #### Functions #### */
/* ################### */
const toggleArchive = (elem) => {
  let url = window.location.href;
  if (!$(elem).is(':checked')) {
    let pos = url.indexOf('archived=');
    let add = '';
    if (url.indexOf('&', pos) > -1) {
      add = url.substring(url.indexOf('&', pos));
    }
    url = url.substring(0, pos - 1) + add;
  } else {
    if (url.indexOf('?') > -1) {
      url += '&archived=true';
    } else {
      url += "?archived=true";
    }
  }
  window.location.href = url;
}

const deleteData = (elem) => {
  const id = $(elem).attr('archive');
  $.ajax({
    method: 'post',
    url: '/webapp/archived',
    dataType: 'json',
    data: { id },
  }).done((res) => {
    let elem = $('#' + id);
    let follow = elem.next();
    elem.remove();
    follow.remove();
  }).fail(() => {
    console.log("Échec de chargement ");
  });
}

const recoverData = (elem) => {
  const id = $(elem).attr('recover');
  $.ajax({
    method: 'post',
    url: '/webapp/recover',
    dataType: 'json',
    data: { id },
  }).done((entities) => {
    document.location.reload();
  }).fail(() => {
    console.log("Échec de chargement ");
  });
}

const initEvents = () => {
  // Archived toggle
  $('#toggle-archive').on('change', function() {
    toggleArchive(this);
  });

  // Delete
  $('*[archive]').click(function () {
    deleteData(this);
  });

  // Recover
  $('*[recover]').click(function () {
    recoverData(this);
  });
}

$(document).ready(e => {
  initEvents();
  accordion.initAccordionNoAnim();
});
