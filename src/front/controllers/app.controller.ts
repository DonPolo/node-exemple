import App, { ISApp } from '../utils/app.util';

import datamanager from '../utils/datamanager.util';
import ParentController from './parent.controller';
import fetchit from '../utils/fetchit';

export default class AppController extends ParentController {
  state: ISApp;
  newpage: string;
  newnav: number;
  // tslint:disable-next-line: prefer-array-literal
  onWindowClick: Array<(event: React.MouseEvent) => void>;
  // tslint:disable-next-line: prefer-array-literal
  onWindowKeyPress: Array<(event: React.KeyboardEvent) => void>;
  constructor(render: App) {
    super('', 0, render);
    this.state = {
      page: null,
      pagename: '',
      nav: 0,
      user: null,
      showheader: false,
      redirect: false,
      newpage: '',
    };
    this.onWindowClick = [];
    this.onWindowKeyPress = [];
    datamanager.app = this;
    this.changeState();
    this.getUser();
  }

  redirect = (page: string) => {
    this.state.redirect = true;
    this.state.newpage = `${page}`;
    this.changeState();
  };

  getUser() {
    fetchit
      .fetchIt('/webapp/api?query=user')
      .then(response => response.json())
      .then(data => {
        datamanager.user = data;
        this.state.user = data;
        this.changePage(this.newpage, this.newnav);
      });
  }

  changePage = (pagename: string, nav: number) => {
    this.state.user = datamanager.user;
    if (pagename === 'login') {
      this.state.showheader = false;
    } else {
      this.state.showheader = true;
    }
    if (pagename !== 'login' && !this.state.user) {
      this.newpage = pagename;
      this.newnav = nav;
      this.redirect('/login');
    } else {
      this.state.pagename = pagename;
      this.state.nav = nav;
    }
    this.changeState();
  };
  windowClick = (event: React.MouseEvent) => {
    this.onWindowClick.forEach(e => e(event));
  };

  windowKeyPress = (event: React.KeyboardEvent) => {
    this.onWindowKeyPress.forEach(e => e(event));
  };
}
