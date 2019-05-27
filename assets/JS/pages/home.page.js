import React from 'react';
import Header from '../components/header.component';
import $ from '../lib/jquery';
import { simplesearch } from '../lib/search';
import Bubble from '../lib/bubble';
import ParentComponent from '../components/parent.component';
import HomeController from '../controllers/home.controller';

let containerObj= [];
let controller = null;

class TopBar extends ParentComponent {
  render () {
    return (
      <div className="search" id="search" search="simple" s-con="container">
        <input type="text" placeholder="Search..."/>
        <div>
            <strong>Mode</strong>
            <label className="switch">
              <input type="checkbox" id="i-mode" onChange={() => controller.changeStyle(event.target.checked)}/>
              <span className="slider round"></span>
            </label>
          </div>
      </div>
    );
  }
}

class File extends ParentComponent {
  constructor(props) {
    super(props);
    this.element = React.createRef();
  }
  componentDidMount () {
    super.componentDidMount();
    if (this.element.current) {
      this.bubble = new Bubble(this.element.current);
    }
  }

  componentWillUnmount () {
    super.componentWillUnmount();
    if (this.bubble) {
      this.bubble.unshowBubble(null);
    }
  }
  render () {
    let elem = null;
    let f= this.props.file;
    let index = this.props.index;
    if (this.props.type === 'training') {
      elem = (
        <>
          <a onClick={() => controller.loadFile(f.name, f.type, 'training')}>{ f.type + '.' + f.name }</a>
          <input type="text" name="name" value={ f.type + '-' + f.name } disabled readOnly/>
          <div></div>
        </>
      );
    } else {
      elem = (
        <>
          <a ref={this.element} bubble-name={ f.type + '.' + f.beauty } bubble={ f.desc } onClick={() => controller.loadFile(f.name, f.type, 'response')}>{ f.type + '.' + f.beauty }</a>
          <input type="text" name="name" value={ f.realname } onChange={() => controller.inputName(event, 'response', index)}/>
          <input type="text" name="type" value={ f.type } onChange={() => controller.inputType(event, 'response', index)}/>
          <div>
            <i className="fas fa-save" onClick={() => controller.modifResponse(event, 'response')} type={ f.type } name={ f.name }></i>
            <i className="fas fa-trash" onClick={() => controller.deleteResponse(event, 'response', index)} type={ f.type } name={ f.name }></i>
          </div>
        </>
      );
    }
    return (
      <span s-val={ f.type + '.' +  f.name } className={this.props.mode}>
        {elem}
      </span>
    );
  }
}

class Container extends ParentComponent {

  render () {
    let com = null;
    com = this.props.files.map((f, index) => (
      <File index={index} key={index} file={f} type={this.props.type} mode={this.props.mode}/>
    ));
    return (
      <div>
        {com}
      </div>
    );
  }
}

class Page extends ParentComponent {
  constructor (props) {
    super(props);
    controller = new HomeController(this, this.props.app);
  }
  componentDidMount () {
    super.componentDidMount();
    controller.initRenderer();
  }
  render () {
    return(
      <>
        <TopBar mode={this.state.mode}/>
        <main id="container">
          <h2>Train : </h2>
          <Container type='training' mode={this.state.mode} files={this.state.files ? this.state.files.training: []}/>
          <h2>Response : </h2>
          <Container type='response' mode={this.state.mode} files={this.state.files ? this.state.files.response: []}/>
        </main>
      </>
    )
  }
}

export default Page;
