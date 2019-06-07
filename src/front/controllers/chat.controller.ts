import $ from 'jquery';
import ParentController from './parent.controller';
import ChatPage, { ISChat } from '../pages/chat.page';
import ParentComponent from '../components/parent.component';
import { FormEvent } from 'react';
import { ParsedResponse } from '../../types/types.util';
import { ChatResponse } from '../../types/front';

export default class ChatController extends ParentController {
  types: string[];
  msgId: number;
  state: ISChat;
  oldphrases: string[];
  msg: string;
  constructor(render: ChatPage) {
    super('chat', 1, render);
    this.types = ['text'];
    this.msgId = 0;
    this.state = {
      msgs: [],
    };
    this.oldphrases = [];
    this.msg = '';
    this.changeType = this.changeType.bind(this);
    this.inputMessage = this.inputMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.selectProposition = this.selectProposition.bind(this);
    this.sendEvent = this.sendEvent.bind(this);
    this.changeState();
  }

  startChat = (render: ParentComponent) => {
    $(document).on('keypress', e => {
      if (e.keyCode === 13) {
        this.sendMessage(render);
      }
    });
  };

  changeType = (event: FormEvent<HTMLInputElement>, type: string) => {
    if (event.currentTarget.checked) {
      this.types.push(type);
    } else {
      this.types.splice(this.types.indexOf(type, 1));
    }
  };

  showResponse = (data: ParsedResponse) => {
    data.responses.forEach(r => {
      const re: ChatResponse = {
        res: r,
        pos: 'left',
        id: this.msgId,
      };
      this.msgId += 1;
      this.state.msgs.push(re);
    });
    this.changeState();
  };

  inputMessage = (
    event: FormEvent<HTMLInputElement>,
    render: ParentComponent,
  ) => {
    render.state.msg = event.currentTarget.value;
    render.state.showProp = {};
    render.state.phrasestoshow = this.oldphrases.filter(p =>
      p.startsWith(event.currentTarget.value),
    );
    render.setState(render.state);
    this.msg = event.currentTarget.value;
  };

  sendMessage = (render: ParentComponent) => {
    if (this.msg === '') return;
    if (this.oldphrases.includes(this.msg)) {
      this.oldphrases.push(this.msg);
    }
    this.state.msgs.push({
      pos: 'right',
      res: { text: this.msg },
      id: this.msgId,
    });
    this.msgId += 1;
    $.ajax({
      method: 'post',
      url: '/webapp/sendmessage',
      dataType: 'json',
      data: { msg: this.msg, from: 'toto', types: this.types },
    })
      .done(data => {
        this.showResponse(data);
      })
      .fail(() => {
        // Do nothing
      });
    render.state.msg = '';
    render.setState(render.state);
    this.changeState();
  };

  sendEvent = (event: FormEvent<HTMLButtonElement | HTMLSelectElement>) => {
    const ev = {
      action: event.currentTarget.value,
    };
    $.ajax({
      method: 'post',
      url: '/webapp/sendevent',
      dataType: 'json',
      data: { from: 'toto', types: this.types, event: ev },
    })
      .done(data => {
        this.showResponse(data);
      })
      .fail(() => {
        // Do nothing
      });
  };

  selectProposition = (render: ParentComponent, prop: string) => {
    render.state.msg = prop;
    render.setState(render.state);
  };
}
