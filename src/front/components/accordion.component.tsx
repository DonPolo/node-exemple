import ParentComponent from './parent.component';
import React from 'react';

interface IPAccordion {
  name: any;
  content: any;
  anim: boolean;
  moreclass?: string;
}
class Accordion extends ParentComponent<IPAccordion> {
  ref: any;
  constructor(props: IPAccordion) {
    super(props);
    this.state = {
      isOpen: false,
      maxHeight: '0px',
      display: 'none',
    };
    this.ref = React.createRef();
    this.state.isOpen = false;
    if (this.props.anim) {
      this.state.display = null;
    } else {
      this.state.maxHeight = null;
    }
  }

  toggle = () => {
    this.state.isOpen = !this.state.isOpen;
    if (this.props.anim) {
      this.state.maxHeight = this.state.isOpen
        ? `${this.ref.current.scrollHeight}px`
        : '0px';
    } else {
      this.state.display = this.state.isOpen ? 'flex' : 'none';
    }
    this.setState(this.state);
  };

  render() {
    return (
      <>
        <button
          className={this.state.isOpen ? 'accordion active' : 'accordion'}
          onClick={this.toggle}
        >
          {this.props.name}
        </button>
        <div
          className={`panel${
            this.props.moreclass ? ` ${this.props.moreclass}` : ''
          }`}
          ref={this.ref}
          style={{
            maxHeight: this.state.maxHeight,
            display: this.state.display,
          }}
        >
          {this.props.content}
        </div>
      </>
    );
  }
}

export default Accordion;
