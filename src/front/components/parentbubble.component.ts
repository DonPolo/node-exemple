import ParentComponent from './parent.component';

class ParentBubble<U = {}, V = {}> extends ParentComponent<U, V> {
  constructor(props: any) {
    super(props);
    this.state = {
      bubble: {
        show: false,
        posX: 0,
        posY: 0,
      },
    };
  }

  onMouseOver = (event: React.MouseEvent) => {
    this.state.bubble.show = true;
    this.onMouseMove(event);
  };

  onMouseMove = (event: React.MouseEvent) => {
    this.state.bubble.posX =
      event.clientX - event.currentTarget.getBoundingClientRect().left + 20;
    this.state.bubble.posY =
      event.clientY - event.currentTarget.getBoundingClientRect().top + 40;
    this.setState(this.state);
  };

  onMouseOut = () => {
    this.state.bubble.show = false;
    this.setState(this.state);
  };
}

export default ParentBubble;
