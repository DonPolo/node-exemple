import React from 'react';

export default class ParentComponent extends React.Component {
  constructor (props) {
    super(props);
    this.isMount = false;
    this.state = {};
  }
  componentDidMount () {
    this.isMount = true;
    if (this.controller) {
      this.controller.renderIsMount();
    }
  }

  componentWillUnmount () {
    this.isMount = false;
    if (this.controller) {
      this.controller.renderIsUnMount();
    }
  }

  stopProp(event) {
    event.stopPropagation();
  }
}
