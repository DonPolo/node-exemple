import ParentController from './parent.controller';
import datamanager from '../utils/datamanager.util';

class AddresponseController extends ParentController {
  constructor(renderer) {
    super();
    this.renderer = renderer;
    this.state = {
      name: '',
      beauty: '',
      type: '',
      error: null,
      success: null,
    };
    this.changeState();

    this.changeBeauty = this.changeBeauty.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeType = this.changeType.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit(event) {
    event.preventDefault();
    const form = new URLSearchParams();
    form.append('name', this.state.name);
    form.append('type', this.state.type);
    form.append('beauty', this.state.beauty);
    this.state.error = null;
    this.state.success = null;
    this.changeState();
    fetch('/webapp/api?query=addresponse', {
      method: 'POST',
      body: form
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          this.state.error = data.msg;
        } else {
          this.state.success = 'Success';
          if (datamanager.home.files) {
            datamanager.home.files.response.push(data);
          }
        }
        this.changeState();
      })
  }

  changeBeauty(event) {
    this.state.beauty = event.target.value;
    this.changeState();
  }

  changeType(event) {
    this.state.type = event.target.value;
    this.changeState();
  }

  changeName(event) {
    this.state.name = event.target.value;
    this.changeState();
  }


}

export default AddresponseController;
