import React from 'react';
import ParentComponent from '../components/parent.component';


class Page extends ParentComponent {
  render () {
    return (
      <div className="error">
        <img src="/pic/lifee.png" alt="logo"/>
        <h1>404</h1>
        <h2>Oooooups this page doesn't exist !</h2>
      </div>
    );
  }
}

export default Page;
