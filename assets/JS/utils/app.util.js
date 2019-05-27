import React from 'react';

import ParentComponent from '../components/parent.component';
// The Header components
import Header from '../components/header.component';


// Some controllers
import AppController from '../controllers/app.controller';


class App extends ParentComponent {
  constructor (props) {
    super(props);
    this.state = {};
    this.controller = new AppController(this, this.props.datas);
  }

  render () {
    return (
      <section className={this.state.pagename}>
        {
          this.state.showheader
          ? <Header app={this.controller} nav={this.state.nav} user={this.state.user} />
          : null
        }
        {this.state.page}
      </section>
    )
  }
}

export default App;
