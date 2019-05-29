import React from 'react';
import ParentComponent from './parent.component';

let appObj = null;

class LogoInfos extends ParentComponent {
  render () {
    return (
      <div>
        <img src="/pic/lifee.png"/>
        <h1>Lifee Admin</h1>
      </div>
    );
  }
}

class MenuItem extends ParentComponent {
  render () {
    if (this.props.href) {
      return (
        <a href={"/webapp" + this.props.href} className={this.props.elem === this.props.nav ? "selected" : ""}>
          <li>{this.props.label}</li>
        </a>
      );
    } else {
      return (
        <a onClick={() => appObj.changePage(this.props.page)} className={this.props.elem === this.props.nav ? "selected" : ""}>
          <li>{this.props.label}</li>
        </a>
      );
    }
  }
}

class Menu extends ParentComponent {
  render () {
    return (
      <ul>
        <MenuItem nav={this.props.nav} elem='1' label='Chat' page='/chat'/>
        <MenuItem nav={this.props.nav} elem='2' label='Training & Responses' page=''/>
        <MenuItem nav={this.props.nav} elem='3' label='Add response' page='/addresponse'/>
        <MenuItem nav={this.props.nav} elem='4' label='Analytics' page='/analytics'/>
        <MenuItem nav={this.props.nav} elem='-1' label='Disconnect' href='/disconnect'/>
      </ul>
    );
  }
}

class UserInfos extends ParentComponent {
  render () {
    return (
      <span>
        <h2>{this.props.user.pseudo}</h2>
      </span>
    );
  }
}

class Header extends ParentComponent {
  render () {
    appObj = this.props.app;
    return (
      <header>
        <LogoInfos/>
        <Menu nav={this.props.nav}/>
        <UserInfos user={this.props.user}/>
      </header>
    );
  }
}

export default Header;
