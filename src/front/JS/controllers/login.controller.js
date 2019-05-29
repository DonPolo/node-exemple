import ParentController from "./parent.controller";
import datamanager from '../utils/datamanager.util';

class LoginController extends ParentController {
  constructor(render, app) {
    super();
    this.renderer = render;
    this.app = app;
    this.state = {
      error: null,
      pseudo: '',
      pwd: ''
    };
    this.changeState();

    this.changePseudo = this.changePseudo.bind(this);
    this.changePwd = this.changePwd.bind(this);
    this.login = this.login.bind(this);
  }

  login(event) {
    event.preventDefault();
    const form = new URLSearchParams();
    form.append('pseudo', this.state.pseudo);
    form.append('pwd', this.state.pwd);
    fetch('/webapp/api?query=login', {
      method: 'POST',
      body: form
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          this.state.error = data.msg;
          this.changeState();
        } else {
          datamanager.user = data;
          this.app.changePage('');
        }
      })
  }

  changePseudo(event) {
    this.state.pseudo = event.target.value;
    this.changeState();
  }

  changePwd(event) {
    this.state.pwd = event.target.value;
    this.changeState();
  }
}

export default LoginController;
