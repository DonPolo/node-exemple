import ParentComponent from './parent.component';
import React from 'react';

interface IPBubble {
  posX: number;
  posY: number;
  name: string;
  txt: string;
}
class BubbleComponent extends ParentComponent<IPBubble> {
  render() {
    return (
      <div
        className='bubble'
        style={{
          top: `${this.props.posY}px`,
          left: `${this.props.posX}px`,
        }}
      >
        <h2>{this.props.name}</h2>
        <span>{this.props.txt}</span>
      </div>
    );
  }
}

export default BubbleComponent;
