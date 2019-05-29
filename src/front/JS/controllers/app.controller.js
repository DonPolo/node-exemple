import App from '../utils/app.util';
import React from 'react';

import ChatApp from '../pages/chat.page';
import HomeApp from '../pages/home.page';
import AddresponseApp from '../pages/addresponse.page';
import AnalyticsApp from '../pages/analytics.page';
import FileApp from '../pages/file.page';
import NotFoundApp from '../pages/notfound.page';
import LoginApp from '../pages/login.page';

import datamanager from '../utils/datamanager.util';
import ParentController from './parent.controller';
import $ from '../lib/jquery';


export default class AppController extends ParentController{

  constructor (renderer) {
    super();
    this.renderer = renderer;
    this.renderer.state = {
      page: null,
      pagename: '',
      nav: 0,
      controller: null,
      user: null,
      showheader: false
    };
    $(window).bind('popstate', this.changeUrl);
    this.getUser();
  }

  getUser() {
    fetch('/webapp/api?query=user')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        datamanager.user = data;
        this.renderer.state.user = data;
        this.changePage('');
        this.changeUrl = this.changeUrl.bind(this);
      });
  }

  changeUrl (event) {
    let page = window.location.pathname;
    if (page.endsWith('/')) page = page.substring(0, page.length -1);
    if (datamanager.user && page === '/webapp/login') {
      window.history.pushState('', '', '/webapp');
      page = '/webapp';
    }
    let pagename = '';
    this.renderer.state.showheader = true;
    this.renderer.state.user = datamanager.user;
    switch(page) {
      case '/webapp':
        // Home
        this.renderer.state.page = <HomeApp app={this}/>
        this.renderer.state.nav = '2';
        pagename = 'home';
        break;
      case '/webapp/chat':
        // Chat
        this.renderer.state.page = <ChatApp />
        this.renderer.state.nav = '1';
        pagename = 'chat';
        break;
      case '/webapp/addresponse':
        // Add response
        this.renderer.state.page = <AddresponseApp />
        this.renderer.state.nav = '3';
        pagename = 'addresponse';
        break;
      case '/webapp/analytics':
        // Analytics
        this.renderer.state.page = <AnalyticsApp />
        this.renderer.state.nav = '4';
        pagename = 'analytics';
        break;
      case '/webapp/login':
        // Login
        this.renderer.state.page = <LoginApp app={this}/>
        this.renderer.state.showheader = false;
        this.renderer.state.nav = '0';
        pagename = 'login';
        break;
    }
    if (page.startsWith ('/webapp/response/')) {
      this.renderer.state.page =  <FileApp app={this} filename={page.split('/')[4]} type={page.split('/')[3]} cat={'response'}/>
      this.renderer.state.nav = '2';
      pagename = 'file';
    } else if (page.startsWith('/webapp/training/')) {
      this.renderer.state.page =  <FileApp app={this} filename={page.split('/')[4]} type={page.split('/')[3]} cat={'training'}/>
      this.renderer.state.nav = '2';
      pagename = 'file';
    }
    if (pagename === '') {
      this.renderer.state.page = <NotFoundApp/>
      this.renderer.state.nav = '0';
      this.renderer.state.showheader = false;
      pagename = 'error';
    }
    this.renderer.state.pagename = pagename;
    if (this.renderer.isMount) {
      this.renderer.setState(this.renderer.state);
    }
  }

  changePage (page) {
    if (!datamanager.user) {
      window.history.pushState('', '', '/webapp/login');
    } else {
      if (page === '/login') {
        page = '';
      }
      if (this.renderer.isMount) {
        window.history.pushState('', '', '/webapp' + page);
      }
    }
    this.changeUrl();
  }
}
