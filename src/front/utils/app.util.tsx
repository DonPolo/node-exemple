import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import ParentComponent from '../components/parent.component';
// The Header component
import Header from '../components/header.component';

// Some controllers
import AppController from '../controllers/app.controller';
import { User, FileInfos } from '../../types/front';

import Page from '../pages';

export interface ISApp {
  pagename: string;
  showheader: boolean;
  nav: number;
  user: User | null;
  page: ParentComponent | null;
  redirect: boolean;
  newpage: string;
}

class App extends ParentComponent<{}, ISApp> {
  state: ISApp;
  controller: AppController;
  constructor(props: {}) {
    super(props);
    this.controller = new AppController(this);
  }

  render() {
    return (
      <section
        onClick={this.controller.windowClick}
        onKeyPress={this.controller.windowKeyPress}
      >
        <BrowserRouter basename='/webapp'>
          <section className={this.state.pagename}>
            {this.state.showheader && this.state.user ? (
              <Header
                app={this.controller}
                nav={this.state.nav}
                user={this.state.user}
              />
            ) : null}
            <Switch>
              <Route exact path='/' component={Page.Home} />
              <Route exact path='/analytics' component={Page.Analytics} />
              <Route exact path='/chat' component={Page.Chat} />
              <Route exact path='/addresponse' component={Page.Addresponse} />
              <Route exact path='/login' component={Page.Login} />
              <Route
                exact
                path='/:cat/:type/:name'
                render={props => {
                  const file: FileInfos = {
                    cat: props.match.params.cat,
                    type: props.match.params.type,
                    filename: props.match.params.name,
                  };
                  return <Page.File file={file} />;
                }}
              />
              <Route component={Page.Notfound} />
            </Switch>
          </section>
          {this.state.redirect ? (
            <Redirect to={this.state.newpage} push={false} />
          ) : null}
        </BrowserRouter>
      </section>
    );
  }
}

export default App;
