import ParentComponent from '../components/parent.component';
import datas from '../utils/datamanager.util';

export default class ParentController {
  render: ParentComponent;
  state: any;
  props: any;
  constructor(
    pagename: string,
    nav: number,
    render: ParentComponent,
    props: any = {},
    notlogin: boolean = false,
  ) {
    this.render = render;
    this.props = props;
    if (pagename !== '' && datas.app) {
      datas.app.changePage(pagename, nav);
    }
  }

  changeState() {
    if (this.render.isMount) {
      this.render.setState(this.state);
    } else {
      this.render.state = this.state;
    }
  }

  renderIsMount() {
    // Do nothing
  }

  renderIsUnMount() {
    // Do nothing
  }
}
