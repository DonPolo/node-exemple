import $ from '../lib/jquery';
import ParentController from './parent.controller';

export default class ChatController extends ParentController {
  constructor (renderer) {
    super();
    this.renderer = renderer;
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

  startChat (renderer) {
    $(document).on('keypress', e => {
      if (e.keyCode === 13) {
        this.sendMessage(renderer);
      }
    });
  }

  changeType (event) {
    if (event.target.checked) {
      this.types.push(event.target.getAttribute('types'));
    } else {
      this.types.splice(this.types.indexOf(event.target.getAttribute('types'), 1));
    }
  }

  changeState () {
    if (this.renderer.isMount) {
      this.renderer.setState(this.state);
    } else {
      this.renderer.state = this.state;
    }
  }

  showResponse (data) {
    data.responses.forEach (r => {
      r.pos = 'left';
      r.id = this.msgId;
      this.msgId++;
      this.state.msgs.push(r);
    });
    this.changeState();
  }

  inputMessage (event, renderer) {
    renderer.state.msg = event.target.value;
    renderer.state.showProp = {};
    renderer.state.phrasestoshow = this.oldphrases.filter(p => p.startsWith(event.target.value));
    renderer.setState(renderer.state);
    this.msg = event.target.value;
  }

  sendMessage (renderer) {
    if (this.msg === '') return;
    if (this.oldphrases.includes(this.msg)) {
      this.oldphrases.push(this.msg);
    }
    this.state.msgs.push({pos: 'right', text: this.msg, id: this.msgId});
    this.msgId++;
    $.ajax({
      method: 'post',
      url: '/webapp/sendmessage',
      dataType: 'json',
      data: { msg: this.msg, from: 'toto', types: this.types },
    }).done((data) => {
      this.showResponse(data);
    }).fail(() => {
      console.log("Échec de chargement ");
    });
    renderer.state.msg = '';
    renderer.setState(renderer.state);
    this.changeState();
  }

  sendEvent (event) {
    const ev = {
      action: event.target.value,
    };
    $.ajax({
      method: 'post',
      url: '/webapp/sendevent',
      dataType: 'json',
      data: { from: 'toto', types: this.types, event: ev },
    }).done((data) => {
      this.showResponse(data);
    }).fail(() => {
      console.log("Échec de chargement ");
    });
  }

  selectProposition (event, renderer) {
    renderer.state.msg = event.target.getAttribute('prop');
    renderer.setState(renderer.state);
  }
}
