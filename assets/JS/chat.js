/* ################# */
/* #### Imports #### */
/* ################# */

// Some style
import '../SASS/chat.sass';

// JQuery Obviously
import $ from './lib/jquery';

/* ################### */
/* #### Variables #### */
/* ################### */

const oldphrases = [];
let container;
let prop;

/* ################### */
/* #### Functions #### */
/* ################### */

const replace = (text) => {
  $('#input-msg').val(text);
}

const showResponse = (data) => {
  data.responses.forEach(r => {
    let d = $(document.createElement('div'));
    d.attr('style', 'text-align: left');
    let s = $(document.createElement('span'));
    if (r.text) {
      s.html(r.text.replace(/\n/, '<br>'));
    } else if (r.btn) {
      r.btn.btns.forEach(b => {
        let but = $(document.createElement('button'));
        but.attr('value', b.value + '|' + b.followupintent);
        but.click(function (e) {
          sendEvent($(this).attr('value'));
        });
        but.html(b.text);
        s.append(but);
      });
    } else if (r.dropdown) {
      let dd = $(document.createElement('select'));
      dd.on('change', function (e) {
        sendEvent($(this).val());
      });
      let o = $(document.createElement('option'));
      o.html('Choose');
      dd.append(o);
      r.dropdown.opts.forEach(op => {
        let o = $(document.createElement('option'));
        o.html(op.text);
        o.attr('value', op.value + '|' + op.followupintent);
        dd.append(o);
      });
      s.append(dd);
    } else if (r.media) {
      let img = $(document.createElement('img'));
      img.attr('src', r.media);
      s.append(img);
    } else if (r.link) {
      let link = $(document.createElement('a'));
      link.attr('href', r.link);
      link.html('Link');
      s.append(link);
    }
    d.append(s);
    container.append(d);
  });

  // Scroll down the container
  const n = container.height();
  container.animate({ scrollTop: n }, 100);
}

const sendEvent = (ac) => {

  let types = [];
  $('input[type="checkbox"]').each(function (index) {
    if($(this).is(':checked')) {
      types.push($(this).attr('types'));
    }
  });
  let event = [
    {
      action: ac
    }
  ];
  $.ajax({
    method: 'post',
    url: '/webapp/sendevent',
    dataType: 'json',
    data: { from: 'toto', types, event },
  }).done((data) => {
    showResponse(data);
  }).fail(() => {
    console.log("Échec de chargement ");
  });
}

const sendMessage = () => {
  const msg = $("#input-msg").val();
  if (!oldphrases.includes(msg)) {
    oldphrases.push(msg);
  }
  $("#input-msg").val('');
  container.append('<div style="text-align: right"><span>' + msg + '</span></div>');
  let types = [];
  $('input[type="checkbox"]').each(function (index) {
    if($(this).is(':checked')) {
      types.push($(this).attr('types'));
    }
  });
  $.ajax({
    method: 'post',
    url: '/webapp/sendmessage',
    dataType: 'json',
    data: { msg, from: 'toto', types },
  }).done((data) => {
    showResponse(data);
  }).fail(() => {
    console.log("Échec de chargement ");
  });
}

const showProposal = () => {
  prop.show();
  prop.html('');
  let val = $('#input-msg').val();
  oldphrases.forEach(e => {
    if (e.startsWith(val)) {
      prop.innerHTML += '<div prop="' + e + '">' + e + '</div>';
    }
  });
  $('*[prop]').click(function (e) {
    replace($(this).attr('prop'));
  });
}

const initEvents = () => {
  $('#but-send').click(e => {
    sendMessage();
  });

  $('#input-msg').on('focus', e => {
    e.stopPropagation();
    showProposal();
  });

  $('#input-msg').on('input', e => {
    showProposal();
  });

  $('#input-msg').click(e => {
    e.stopPropagation();
  });

  $(document.body).click(e => {
    prop.hide();
  });

  $(document).on('keypress', e => {
    if (e.keyCode === 13) {
      sendMessage();
    }
  });
}

$(document).ready(e => {
  container = $('#msg-container');
  prop = $('#prop');
  initEvents();
});
