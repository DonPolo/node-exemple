import React from 'react';
import ParentComponent from '../components/parent.component';
import LoginController from '../controllers/login.controller';

class Page extends ParentComponent {
  constructor (props) {
    super(props);
    this.controller = new LoginController(this, this.props.app);
  }
  render () {
    return (
      <main>
        <form method="post" onSubmit={this.controller.login}>
          <h2>Log In</h2>
          {this.state.error ? <span>{ this.state.error }</span> : null}
          <label htmlFor="pseudo" className="label">Pseudo
            <input type="text" name="pseudo" id="pseudo" className="input" value={this.state.pseudo} onChange={this.controller.changePseudo}/>
          </label>
          <label htmlFor="pwd" className="label">Password
            <input type="password" name="pwd" id="pwd" className="input" value={this.state.pwd} onChange={this.controller.changePwd}/>
          </label>
          <button type="submit" className="btn">Continue</button>
        </form>
      </main>
    );
  }
}

export default Page;
