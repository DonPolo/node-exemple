import React from 'react';
import ParentComponent from '../components/parent.component';
import ChatController from '../controllers/chat.controller';
import { ChatResponse } from '../../types/front';

// tslint:disable: max-classes-per-file

class Message extends ParentComponent<{
  msg: any;
  controller: ChatController;
}> {
  render() {
    let content = null;
    if (this.props.msg.res.text) {
      content = <span>{this.props.msg.res.text.replace(/\n/, '<br>')}</span>;
    } else if (this.props.msg.res.btn) {
      content = this.props.msg.res.btn.btns.map((b: any) => (
        <button
          value={`${b.value}|${b.followupintent}`}
          onClick={this.props.controller.sendEvent}
        >
          {b.text}
        </button>
      ));
    } else if (this.props.msg.res.dropdown) {
      const opt = this.props.msg.res.dropdown.opts.map((op: any) => (
        <option value={`${op.value}|${op.followupintent}`}>{op.text}</option>
      ));
      content = (
        <select onChange={this.props.controller.sendEvent}>
          <option>Choose</option>
          {opt}
        </select>
      );
    } else if (this.props.msg.res.media) {
      content = <img src={this.props.msg.res.media} />;
    } else if (this.props.msg.res.link) {
      content = (
        <a href={this.props.msg.res.link} target='_blank'>
          Link
        </a>
      );
    }
    return <div style={{ textAlign: this.props.msg.pos }}>{content}</div>;
  }
}

class Chat extends ParentComponent<{ msgs: any; controller: ChatController }> {
  constructor(props: any) {
    super(props);
    this.state.msg = '';
    this.state.showProp = { display: 'none' };
    this.state.phrasestoshow = [];
    this.props.controller.startChat(this);
  }

  render() {
    return (
      <main>
        <div id='msg-container'>
          {this.props.msgs.map((msg: ChatResponse) => (
            <Message
              key={msg.id}
              msg={msg}
              controller={this.props.controller}
            />
          ))}
        </div>
        <span>
          <div className='proposition' id='prop' style={this.state.showProp}>
            {this.state.phrasestoshow.map((prop: string, index: number) => (
              <div
                key={index}
                onClick={() =>
                  this.props.controller.selectProposition(this, prop)
                }
              >
                {prop}
              </div>
            ))}
          </div>
          <input
            type='text'
            value={this.state.msg}
            id='input-msg'
            onChange={event => this.props.controller.inputMessage(event, this)}
            onInput={event => this.props.controller.inputMessage(event, this)}
          />
          <button
            type='button'
            id='but-send'
            onClick={() => this.props.controller.sendMessage(this)}
          >
            Send
          </button>
        </span>
      </main>
    );
  }
}

class LeftMenu extends ParentComponent<{ controller: ChatController }> {
  render() {
    return (
      <nav>
        <h2>Accepted types</h2>
        <div>
          <label htmlFor='i-txt'>
            {' '}
            Text
            <input type='checkbox' id='i-txt' disabled checked />
          </label>
          <label htmlFor='i-btn'>
            {' '}
            Button
            <input
              type='checkbox'
              id='i-btn'
              onChange={event => this.props.controller.changeType(event, 'btn')}
            />
          </label>
          <label htmlFor='i-dd'>
            {' '}
            Dropdown
            <input
              type='checkbox'
              id='i-dd'
              onChange={event =>
                this.props.controller.changeType(event, 'dropdown')
              }
            />
          </label>
          <label htmlFor='i-media'>
            {' '}
            Media
            <input
              type='checkbox'
              id='i-media'
              onChange={event =>
                this.props.controller.changeType(event, 'media')
              }
            />
          </label>
          <label htmlFor='i-link'>
            {' '}
            Link
            <input
              type='checkbox'
              id='i-link'
              onChange={event =>
                this.props.controller.changeType(event, 'link')
              }
            />
          </label>
        </div>
      </nav>
    );
  }
}

export interface ISChat {
  msgs: ChatResponse[];
}
class ChatPage extends ParentComponent<{}, ISChat> {
  controller: ChatController;
  constructor(props: {}) {
    super(props);
    this.controller = new ChatController(this);
  }

  render() {
    return (
      <>
        <Chat msgs={this.state.msgs} controller={this.controller} />
        <LeftMenu controller={this.controller} />
      </>
    );
  }
}

export default ChatPage;
