import React, { SyntheticEvent } from 'react';
import ParentController from '../controllers/parent.controller';

export default class ParentComponent<U = {}, V = {}> extends React.Component<
  U,
  V
> {
  isMount: boolean;
  controller?: ParentController;
  state: any;
  constructor(props: any) {
    super(props);
    this.state = {};
    this.isMount = false;
  }
  componentDidMount() {
    this.isMount = true;
    if (this.controller) {
      this.controller.renderIsMount();
    }
  }

  componentWillUnmount() {
    this.isMount = false;
    if (this.controller) {
      this.controller.renderIsUnMount();
    }
  }

  stopProp(event: SyntheticEvent) {
    event.stopPropagation();
  }
}
