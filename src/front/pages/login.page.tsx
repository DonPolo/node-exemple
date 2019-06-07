import React from 'react';
import ParentComponent from '../components/parent.component';
import LoginController from '../controllers/login.controller';
import { Redirect } from 'react-router';

export interface ISLogin {
  error: string | null;
  pseudo: string;
  pwd: string;
  redirect: boolean;
  push: boolean;
}

class LoginPage extends ParentComponent<{}, ISLogin> {
  controller: LoginController;
  constructor(props: {}) {
    super(props);
    this.controller = new LoginController(this);
  }
  render() {
    return (
      <main>
        <form method='post' onSubmit={this.controller.login}>
          <h2>Log In</h2>
          {this.state.error ? <span>{this.state.error}</span> : null}
          <label htmlFor='pseudo' className='label'>
            Pseudo
            <input
              type='text'
              name='pseudo'
              id='pseudo'
              className='input'
              value={this.state.pseudo}
              onChange={this.controller.changePseudo}
            />
          </label>
          <label htmlFor='pwd' className='label'>
            Password
            <input
              type='password'
              name='pwd'
              id='pwd'
              className='input'
              value={this.state.pwd}
              onChange={this.controller.changePwd}
            />
          </label>
          <button type='submit' className='btn'>
            Continue
          </button>
        </form>
        {this.state.redirect ? <Redirect to='' push={this.state.push} /> : null}
      </main>
    );
  }
}

export default LoginPage;
