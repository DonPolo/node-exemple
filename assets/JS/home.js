/* ################# */
/* #### Imports #### */
/* ################# */

// Some style
import '../SASS/home.sass';

// Some libs
import accordion from './lib/accordion';
import search from './lib/search';
import Bubble from './lib/bubble';

// JQuery Obviously
import $ from './lib/jquery';

/* ################### */
/* #### Functions #### */
/* ################### */

const deleteElem = (event, cat, type, name, elem) => {
  let loading = $(document.createElement('img'));
  loading.attr('src', '/pic/load.gif');
  $(elem).append(loading);
  $(elem).removeClass('fa-trash');
  $.ajax({
    method: 'post',
    url: '/webapp/delete',
    dataType: 'json',
    data: {cat, type, name},
  }).done((entities) => {
    let eleme = $(elem);
    while(!eleme.attr('s-val')) {
      eleme = eleme.parent();
    }
    eleme.remove();
  }).fail(() => {
    loading.remove();
    $(elem).addClass('fa-trash');
  });
}

const modifElem = (event, cat, type, name, elem) => {
  let loading = $(document.createElement('img'));
  loading.attr('src', '/pic/load.gif');
  $(elem).append(loading);
  $(elem).removeClass('fa-save');
  let eleme = $(elem);
  while (!eleme.attr('s-val')) {
    eleme = eleme.parent();
  }
  let newname = eleme.find('input[name="name"]').get(0).value;
  let newtype = eleme.find('input[name="type"]').get(0).value;
  $.ajax({
    method: 'post',
    url: '/webapp/modif',
    dataType: 'json',
    data: { cat, type, name, newtype, newname },
  }).done((entities) => {
    loading.remove();
    $(elem).addClass('fa-save');
  }).fail(() => {
    loading.remove();
    $(elem).addClass('fa-save');
  });
}

const initEvents = () => {
  $('#i-mode').on('change', function (e) {
    let newclass = "mode-default";
    if ($(this).is(':checked')) {
      newclass = "mode-modify";
    }
    $('span[s-val]').removeClass().addClass(newclass);
  });

  $('*[response-modif]').click(function (e) {
    let type = $(this).attr('type');
    let name = $(this).attr('name');
    modifElem(e, 'response', type, name, this);
  });

  $('*[response-delete]').click(function (e) {
    let type = $(this).attr('type');
    let name = $(this).attr('name');
    deleteElem(e, 'response', type, name, this);
  });

}

$(document).ready(e => {
  Bubble.bind('*[bubble]');
  initEvents();
});
