import ParentController from './parent.controller';
import datamanager from '../utils/datamanager.util';
import LoginPage, { ISLogin } from '../pages/login.page';
import { FormEvent } from 'react';

class LoginController extends ParentController {
  state: ISLogin;
  constructor(render: LoginPage) {
    super('login', -1, render, true);
    this.state = {
      error: null,
      pseudo: '',
      pwd: '',
      redirect: false,
      push: false,
    };
    if (datamanager.user) {
      this.state.redirect = true;
    }
    this.changeState();
  }

  login = (event: FormEvent) => {
    event.preventDefault();
    const form = new URLSearchParams();
    form.append('pseudo', this.state.pseudo);
    form.append('pwd', this.state.pwd);
    fetch('/webapp/api?query=login', {
      method: 'POST',
      body: form,
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          this.state.error = data.msg;
        } else {
          datamanager.user = data;
          this.state.push = true;
          this.state.redirect = true;
        }
        this.changeState();
      });
  };

  changePseudo = (event: FormEvent<HTMLInputElement>) => {
    this.state.pseudo = event.currentTarget.value;
    this.changeState();
  };

  changePwd = (event: FormEvent<HTMLInputElement>) => {
    this.state.pwd = event.currentTarget.value;
    this.changeState();
  };
}

export default LoginController;
