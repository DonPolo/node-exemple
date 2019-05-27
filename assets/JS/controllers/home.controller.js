import $ from '../lib/jquery';
import datamanager from '../utils/datamanager.util';
import ParentController from './parent.controller';
import Bubble from '../lib/bubble';
import { simplesearch } from '../lib/search';

export default class HomeController extends ParentController {

  constructor (renderer, app) {
    super();
    this.renderer = renderer;
    this.app = app;
    this.state = {
      files: datamanager.home.files,
      mode: 'mode-default'
    };
    if (!datamanager.home.files) {
      this.fetch();
    }
    this.changeState();
    this.changeStyle = this.changeStyle.bind(this);
    this.inputName = this.inputName.bind(this);
    this.inputType = this.inputType.bind(this);
  }

  fetch () {
    fetch('/webapp/api?query=home')
      .then(response => response.json())
      .then(data => {
        datamanager.home.files = data;
        this.state.files = data;
        this.changeState();
      })
  }

  initRenderer () {
    let li = $("*[search='simple']");
    li.each(search => {
      simplesearch($(li.get(search)));
    });
  }

  changeStyle (style) {
    if (style) {
      this.state.mode = 'mode-modify';
    } else {
      this.state.mode = 'mode-default';
    }
    this.changeState();
  }

  inputType (event, type, me) {
    this.state.files[type][me].type = event.target.value;
    this.changeState();
  }

  inputName (event, type, me) {
    this.state.files[type][me].realname = event.target.value;
    this.changeState();
  }

  modifResponse (event, fileType) {
    let loading = $(document.createElement('img'));
    loading.attr('src', '/pic/load.gif');
    $(event.target).append(loading);
    $(event.target).removeClass('fa-save');
    let type = $(event.target).attr('type');
    let name = $(event.target).attr('name');
    let cat = fileType;
    let eleme = $(event.target);
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
    }).done((res) => {
      loading.remove();
      $(event.target).addClass('fa-save');
    }).fail(() => {
      loading.remove();
      $(event.target).addClass('fa-save');
    });
  }

  deleteResponse (event, fileType, me) {
    const elem = event.target;
    let cat = fileType;
    let type = $(event.target).attr('type');
    let name = $(event.target).attr('name');
    let loading = $(document.createElement('img'));

    loading.attr('src', '/pic/load.gif');
    $(elem).append(loading);
    $(elem).removeClass('fa-trash');
    $.ajax({
      method: 'post',
      url: '/webapp/delete',
      dataType: 'json',
      data: {cat, type, name},
    }).done((res) => {
      this.state.files[fileType].splice(me, 1);
      this.changeState();
    }).fail(() => {
      loading.remove();
      $(elem).addClass('fa-trash');
    });
  }

  loadFile (filename, type, cat) {
    this.app.changePage('/' + cat + '/' + type + '/' + filename);
  }


}
