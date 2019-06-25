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
  shouldRedirect: boolean;
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
      isLoad: false,
    };
    this.shouldRedirect = false;
    this.onWindowClick = [];
    this.onWindowKeyPress = [];
    datamanager.app = this;
    this.changeState();
  }

  redirect = (page: string) => {
    this.state.redirect = true;
    this.state.newpage = `${page}`;
    this.shouldRedirect = true;
    this.changeState();
  };

  getUser() {
    fetchit
      .fetchIt('/webapp/api?query=user')
      .then(response => response.json())
      .then(data => {
        datamanager.user = data;
        this.state.user = data;
        this.state.isLoad = true;
        if (!this.state.user) {
          this.redirect('/login');
        } else {
          this.changeState();
        }
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
      return;
    }
    this.state.pagename = pagename;
    this.state.nav = nav;

    this.changeState();
  };
  windowClick = (event: React.MouseEvent) => {
    this.onWindowClick.forEach(e => e(event));
  };

  windowKeyPress = (event: React.KeyboardEvent) => {
    this.onWindowKeyPress.forEach(e => e(event));
  };

  renderIsMount = () => {
    this.state.redirect = false;
    if (!this.state.user) {
      this.getUser();
    }
  };

  renderUpdate = () => {
    if (!this.state.redirect) return;
    this.state.redirect = false;
    this.changeState();
  };
}
