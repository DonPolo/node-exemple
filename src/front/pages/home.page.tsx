import React, { FormEvent } from 'react';
import Bubble from '../utils/bubble';
import ParentComponent from '../components/parent.component';
import HomeController from '../controllers/home.controller';
import { Redirect } from 'react-router';

// tslint:disable: max-classes-per-file

class TopBar extends ParentComponent<{ controller: HomeController }> {
  render() {
    return (
      // @ts-ignore
      <div className='search' id='search' search='simple' s-con='container'>
        <input type='text' placeholder='Search...' />
        <div>
          <strong>Mode</strong>
          <label className='switch'>
            <input
              type='checkbox'
              id='i-mode'
              onChange={(event: FormEvent<HTMLInputElement>) =>
                this.props.controller.changeStyle(event.currentTarget.checked)
              }
            />
            <span className='slider round' />
          </label>
        </div>
      </div>
    );
  }
}

class File extends ParentComponent<{
  index: number;
  file: any;
  type: string;
  mode: string;
  controller: HomeController;
}> {
  element: any;
  bubble: Bubble;
  constructor(props: any) {
    super(props);
    this.element = React.createRef();
  }
  componentDidMount() {
    super.componentDidMount();
    if (this.element.current) {
      this.bubble = new Bubble(this.element.current);
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    if (this.bubble) {
      this.bubble.unshowBubble();
    }
  }
  render() {
    let elem = null;
    const f = this.props.file;
    const index = this.props.index;
    if (this.props.type === 'training') {
      elem = (
        <>
          <a
            onClick={() =>
              this.props.controller.loadFile(f.name, f.type, 'training')
            }
          >
            {`${f.type}.${f.name}`}
          </a>
          <input
            type='text'
            name='name'
            value={`${f.type}.${f.name}`}
            disabled
            readOnly
          />
          <div />
        </>
      );
    } else {
      elem = (
        <>
          {
            // @ts-ignore
            <a
              ref={this.element}
              bubble-name={`${f.type}.${f.beauty}`}
              bubble={f.desc}
              onClick={() =>
                this.props.controller.loadFile(f.name, f.type, 'response')
              }
            >
              {`${f.type}.${f.beauty}`}
            </a>
          }
          <input
            type='text'
            name='name'
            value={f.realname}
            onChange={event =>
              this.props.controller.inputName(event, 'response', index)
            }
          />
          <input
            type='text'
            name='type'
            value={f.type}
            onChange={event =>
              this.props.controller.inputType(event, 'response', index)
            }
          />
          <div>
            {
              // @ts-ignore
              <i
                className='fas fa-save'
                onClick={event =>
                  this.props.controller.modifResponse(event, 'response')
                }
                type={f.type}
                name={f.name}
              />
            }
            {
              // @ts-ignore
              <i
                className='fas fa-trash'
                onClick={event =>
                  this.props.controller.deleteResponse(event, 'response', index)
                }
                type={f.type}
                name={f.name}
              />
            }
          </div>
        </>
      );
    }
    return (
      <span s-val={`${f.type}.${f.name}`} className={this.props.mode}>
        {elem}
      </span>
    );
  }
}

class Container extends ParentComponent<{
  type: string;
  mode: string;
  files: any[];
  controller: HomeController;
}> {
  render() {
    let com = null;
    if (this.props.files) {
      com = this.props.files.map((f, index) => (
        <File
          index={index}
          key={index}
          file={f}
          type={this.props.type}
          mode={this.props.mode}
          controller={this.props.controller}
        />
      ));
    } else {
      com = (
        <span className='loader'>
          <img src='/pic/load.gif' />
        </span>
      );
    }
    return <div>{com}</div>;
  }
}

export interface ISHome {
  mode: string;
  files: any[];
  redirect: boolean;
  newpage: string;
}
class HomePage extends ParentComponent<{}, ISHome> {
  controller: HomeController;
  constructor(props: {}) {
    super(props);
    this.controller = new HomeController(this);
  }
  render() {
    return (
      <>
        <TopBar controller={this.controller} />
        <main id='container'>
          <h2>Train : </h2>
          <Container
            type='training'
            mode={this.state.mode}
            files={this.state.files ? this.state.files.training : null}
            controller={this.controller}
          />
          <h2>Response : </h2>
          <Container
            type='response'
            mode={this.state.mode}
            files={this.state.files ? this.state.files.response : null}
            controller={this.controller}
          />
          {this.state.redirect ? (
            <Redirect to={this.state.newpage} push={true} />
          ) : null}
        </main>
      </>
    );
  }
}

export default HomePage;
