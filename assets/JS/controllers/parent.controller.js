export default class ParentController {
  changeState () {
    if (this.renderer.isMount) {
      this.renderer.setState(this.state);
    } else {
      this.renderer.state = this.state;
    }
  }

  renderIsMount () {

  }

  renderIsUnMount () {

  }
}
