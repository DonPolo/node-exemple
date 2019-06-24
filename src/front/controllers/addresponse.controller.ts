import ParentController from './parent.controller';
import datamanager from '../utils/datamanager.util';
import AddResponsePage, { ISAddResponse } from '../pages/addresponse.page';
import { FormEvent } from 'react';
import fetch from '../utils/fetchit';

class AddresponseController extends ParentController {
  state: ISAddResponse;
  constructor(render: AddResponsePage) {
    super('addresponse', 3, render);
    this.state = {
      name: '',
      beauty: '',
      type: '',
      error: null,
      success: null,
    };
    this.changeState();
  }

  submit = (event: FormEvent) => {
    event.preventDefault();
    const form = new URLSearchParams();
    form.append('name', this.state.name);
    form.append('type', this.state.type);
    form.append('beauty', this.state.beauty);
    this.state.error = null;
    this.state.success = null;
    this.changeState();
    fetch
      .fetchIt('/webapp/api?query=addresponse', {
        method: 'POST',
        body: form,
      })
      .then(response => {
        if (response.status === 401) {
          window.history.replaceState('', '', '/webapp/login');
          return { error: true };
        }
        return response.json();
      })
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
      });
  };

  changeBeauty = (event: FormEvent<HTMLInputElement>) => {
    this.state.beauty = event.currentTarget.value;
    this.changeState();
  };

  changeType = (event: FormEvent<HTMLInputElement>) => {
    this.state.type = event.currentTarget.value;
    this.changeState();
  };

  changeName = (event: FormEvent<HTMLInputElement>) => {
    this.state.name = event.currentTarget.value;
    this.changeState();
  };
}

export default AddresponseController;
