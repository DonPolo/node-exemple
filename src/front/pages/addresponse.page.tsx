import React from 'react';
import ParentComponent from '../components/parent.component';
import AddresponseController from '../controllers/addresponse.controller';
// tslint:disable: max-classes-per-file

export interface ISAddResponse {
  success: string | null;
  error: string | null;
  name: string;
  beauty: string;
  type: string;
}
class AddResponse extends ParentComponent<{}, ISAddResponse> {
  controller: AddresponseController;
  constructor(props: {}) {
    super(props);
    this.controller = new AddresponseController(this);
  }
  render() {
    return (
      <main>
        {
          // @ts-ignore
          <form
            method='post'
            onSubmit={this.controller.submit}
            test='addresp_save'
          >
            <h2>New response</h2>
            {this.state.success ? <span>{this.state.success}</span> : ''}
            {this.state.error ? <span>{this.state.error}</span> : ''}
            <label htmlFor='name' className='label'>
              Intent name
              <input
                type='text'
                name='name'
                id='name'
                className='input'
                value={this.state.name}
                onChange={this.controller.changeName}
              />
            </label>
            <label htmlFor='beauty' className='label'>
              Intent beauty name
              <input
                type='text'
                name='beauty'
                id='beauty'
                className='input'
                value={this.state.beauty}
                onChange={this.controller.changeBeauty}
              />
            </label>
            <label htmlFor='type' className='label'>
              Intent type
              <input
                type='text'
                name='type'
                id='type'
                className='input'
                value={this.state.type}
                onChange={this.controller.changeType}
              />
            </label>
            <button className='btn'>Save</button>
          </form>
        }
      </main>
    );
  }
}

class AddResponsePage extends ParentComponent {
  render() {
    return (
      <>
        <AddResponse />
      </>
    );
  }
}

export default AddResponsePage;
