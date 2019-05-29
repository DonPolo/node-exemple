import React from 'react';
import $ from '../lib/jquery';
import ParentComponent from '../components/parent.component';
import ChatController from '../controllers/chat.controller';

let controller = null;

class Message extends ParentComponent {
  render () {
    let content = null;
    if (this.props.msg.text) {
      content = <span>{this.props.msg.text.replace(/\n/, '<br>')}</span>;
    } else if (this.props.msg.btn) {
      content = this.props.msg.btn.btns.map((b) => (
        <button value={b.value + '|' + b.followupintent} onClick={controller.sendEvent}>{b.text}</button>
      ));
    } else if (this.props.msg.dropdown) {
      const opt = this.props.msg.dropdown.opts.map((op) => (
        <option value={op.value + '|' + op.followupintent}>{op.text}</option>
      ));
      content = (
        <select onChange={controller.sendEvent}>
          <option>Choose</option>
          {opt}
        </select>
      );
    } else if (this.props.msg.media) {
      content = <img src={this.props.msg.media}/>;
    } else if (this.props.msg.link) {
      content = <a href={this.props.msg.link} target='_blank'>Link</a>;
    }
    return (
      <div style={{textAlign: this.props.msg.pos}}>
        {content}
      </div>
    );
  }
}

class Chat extends ParentComponent {
  constructor (props) {
    super(props);
    this.state.msg = '';
    this.state.showProp = {display: 'none'};
    this.state.phrasestoshow = [];
    controller.startChat(this);
  }

  render () {
    return (
      <main>
        <div id="msg-container">
          {
            this.props.msgs.map((msg) => (<Message key={msg.id} msg={msg}/>))
          }
        </div>
        <span>
          <div className="proposition" id="prop" style={this.state.showProp}>
            {
              this.state.phrasestoshow.map((prop, index) => (
                <div key={index} prop={prop} onClick={() => controller.selectProposition(event, this)}>{prop}</div>
              ))
            }
          </div>
          <input type="text" value={this.state.msg} id="input-msg" onChange={() => controller.inputMessage(event, this)} onInput={() => controller.inputMessage(event, this)}/>
          <button type="button" id="but-send" onClick={() => controller.sendMessage(this)}>Send</button>
        </span>
      </main>
    );
  }
}

class LeftMenu extends ParentComponent {

  render () {
    return (
      <nav>
        <h2>Accepted types</h2>
        <div>
          <label htmlFor='i-txt'> Text
            <input type='checkbox' id='i-txt' disabled checked/>
          </label>
          <label htmlFor='i-btn'> Button
            <input type='checkbox' id='i-btn' types='btn' onChange={controller.changeType}/>
          </label>
          <label htmlFor='i-dd'> Dropdown
            <input type='checkbox' id='i-dd' types='dropdown' onChange={controller.changeType}/>
          </label>
          <label htmlFor='i-media'> Media
            <input type='checkbox' id='i-media' types='media' onChange={controller.changeType}/>
          </label>
          <label htmlFor='i-link'> Link
            <input type='checkbox' id='i-link' types='link' onChange={controller.changeType}/>
          </label>
        </div>
      </nav>
    );
  }
}

class Page extends ParentComponent {

  constructor (props) {
    super(props);
    controller = new ChatController(this);
  }

  render() {
    return(
      <>
        <Chat msgs={this.state.msgs}/>
        <LeftMenu/>
      </>
    );
  }
}

export default Page;
