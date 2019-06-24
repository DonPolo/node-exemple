import $ from 'jquery';
import datamanager from '../utils/datamanager.util';
import ParentController from './parent.controller';
import { simplesearch } from '../utils/search';
import { ISHome } from '../pages/home.page';
import { FormEvent } from 'react';
import ParentComponent from '../components/parent.component';
import fetchit from '../utils/fetchit';

export default class HomeController extends ParentController {
  state: ISHome;
  constructor(render: ParentComponent) {
    super('home', 2, render);
    this.state = {
      files: datamanager.home.files,
      mode: 'mode-default',
      redirect: false,
      newpage: '',
    };
    if (!datamanager.home.files) {
      this.fetch();
    }
    this.changeState();
    this.changeStyle = this.changeStyle.bind(this);
    this.inputName = this.inputName.bind(this);
    this.inputType = this.inputType.bind(this);
  }

  fetch = () => {
    fetchit
      .fetchIt('/webapp/api?query=home')
      .then(response => {
        if (response.status === 401) {
          window.history.replaceState('', '', '/webapp/login');
          return { error: true };
        }
        return response.json();
      })
      .then(data => {
        datamanager.home.files = data;
        this.state.files = data;
        this.changeState();
      });
  };

  renderIsMount = () => {
    const li = $("*[search='simple']");
    li.each(search => {
      simplesearch($(li.get(search)));
    });
  };

  changeStyle = (style: boolean) => {
    if (style) {
      this.state.mode = 'mode-modify';
    } else {
      this.state.mode = 'mode-default';
    }
    this.changeState();
  };

  inputType = (
    event: FormEvent<HTMLInputElement>,
    type: string,
    me: number,
  ) => {
    const files: any = this.state.files;
    files[type][me].type = event.currentTarget.value;
    this.changeState();
  };

  inputName = (
    event: FormEvent<HTMLInputElement>,
    type: string,
    me: number,
  ) => {
    const files: any = this.state.files;
    files[type][me].realname = event.currentTarget.value;
    this.changeState();
  };

  // FIXME not clean
  modifResponse = (event: React.MouseEvent<HTMLElement>, fileType: string) => {
    const loading = $(document.createElement('img'));
    loading.attr('src', '/pic/load.gif');
    $(event.target).append(loading);
    $(event.target).removeClass('fa-save');
    const type = $(event.target).attr('type');
    const name = $(event.target).attr('name');
    const cat = fileType;
    let eleme = $(event.target);
    while (!eleme.attr('s-val')) {
      eleme = eleme.parent();
    }
    const newname = eleme.find('input[name="name"]').val();
    const newtype = eleme.find('input[name="type"]').val();
    $.ajax({
      method: 'post',
      url: '/webapp/modif',
      dataType: 'json',
      data: { cat, type, name, newtype, newname },
    })
      .done(res => {
        loading.remove();
        $(event.target).addClass('fa-save');
      })
      .fail(() => {
        loading.remove();
        $(event.target).addClass('fa-save');
      });
  };

  // FIXME not clean
  deleteResponse = (
    event: React.MouseEvent<HTMLElement>,
    fileType: string,
    me: number,
  ) => {
    const elem = event.target;
    const cat = fileType;
    const type = $(event.target).attr('type');
    const name = $(event.target).attr('name');
    const loading = $(document.createElement('img'));

    loading.attr('src', '/pic/load.gif');
    $(elem).append(loading);
    $(elem).removeClass('fa-trash');
    $.ajax({
      method: 'post',
      url: '/webapp/delete',
      dataType: 'json',
      data: { cat, type, name },
    })
      .done(res => {
        const files: any = this.state.files;
        files[fileType].splice(me, 1);
        this.changeState();
      })
      .fail(() => {
        loading.remove();
        $(elem).addClass('fa-trash');
      });
  };

  loadFile = (filename: string, cat: string) => {
    this.state.redirect = true;
    this.state.newpage = `/${cat}/${filename}`;
    this.changeState();
  };
}
