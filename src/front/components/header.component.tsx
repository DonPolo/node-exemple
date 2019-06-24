import React from 'react';
import ParentComponent from './parent.component';
import { Link } from 'react-router-dom';
import { User } from '../../types/front';

// tslint:disable: max-classes-per-file

interface IPHeader {
  nav: number;
  user: User;
}

class LogoInfos extends ParentComponent {
  render() {
    return (
      <div>
        <img src='/pic/lifee.png' />
        <h1>Lifee Admin</h1>
      </div>
    );
  }
}

interface IPMenuItem {
  href?: string;
  elem: number;
  nav: number;
  label: string;
  page: string;
}
class MenuItem extends ParentComponent<IPMenuItem> {
  render() {
    if (this.props.href) {
      return (
        <a
          href={`/webapp${this.props.href}`}
          className={this.props.elem === this.props.nav ? 'selected' : ''}
        >
          <li>{this.props.label}</li>
        </a>
      );
    }
    return (
      <Link
        to={`${this.props.page}`}
        className={this.props.elem === this.props.nav ? 'selected' : ''}
      >
        <li>{this.props.label}</li>
      </Link>
    );
  }
}

class Menu extends ParentComponent<{ nav: number }> {
  render() {
    return (
      <ul>
        <MenuItem nav={this.props.nav} elem={1} label='Chat' page='/chat' />
        <MenuItem
          nav={this.props.nav}
          elem={2}
          label='Training & Responses'
          page='/'
        />
        <MenuItem
          nav={this.props.nav}
          elem={3}
          label='Add response'
          page='/addresponse'
        />
        <MenuItem
          nav={this.props.nav}
          elem={4}
          label='Analytics'
          page='/analytics'
        />
        <MenuItem
          nav={this.props.nav}
          elem={-1}
          label='Disconnect'
          href='/disconnect'
          page=''
        />
      </ul>
    );
  }
}

class UserInfos extends ParentComponent<{ user: User }> {
  render() {
    return (
      <span>
        <h2>{this.props.user.pseudo}</h2>
      </span>
    );
  }
}

class Header extends ParentComponent<IPHeader> {
  render() {
    return (
      <header>
        <LogoInfos />
        <Menu nav={this.props.nav} />
        <UserInfos user={this.props.user} />
      </header>
    );
  }
}

export default Header;
