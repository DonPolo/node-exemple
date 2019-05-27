import datamanager from '../utils/datamanager.util';
import $ from '../lib/jquery';
import accordion from '../lib/accordion';
import ParentController from './parent.controller';

export default class AnalyticsController extends ParentController {
  constructor (renderer) {
    super();
    this.renderer = renderer;
    this.renderer.state = {
      datas: datamanager.analytics.datas,
      nbpage: 0,
      archived: false,
      curpage: 1,
      realdatas: []
    };
    if (!datamanager.analytics.datas) {
      this.fetch();
    } else {
      this.changePage(datamanager.analytics.datas, 1, 20, false);
    }
    this.toggleArchive = this.toggleArchive.bind(this);
    this.changePage = this.changePage.bind(this);
    this.changePageNoOption = this.changePageNoOption.bind(this);
    this.inputPage = this.inputPage.bind(this);
  }

  fetch () {
    fetch('/webapp/api?query=analytics')
      .then(response => response.json())
      .then(data => {
        datamanager.analytics.datas = data.datas;
        if (this.renderer.isMount) {
          this.changePage(data.datas, this.renderer.state.curpage, 20, this.renderer.state.archived);
        }
      });
  }

  changePage (datas, page, nbresult, archived) {
    this.renderer.state.datas = datas;
    if (!archived) {
      datas = datas.filter(d => !d.archived);
    }
    let nbpage = parseInt(datas.length / nbresult);
    if (datas.length / nbresult > nbpage) nbpage++;
    datas = datas.slice((page-1)*nbresult, (page-1)*nbresult+nbresult);
    this.renderer.state.nbpage = nbpage;
    this.renderer.state.archived = archived;
    this.renderer.state.curpage = page;
    this.renderer.state.realdatas = datas;
    if (this.renderer.isMount) {
      this.renderer.setState(this.renderer.state);
    }
  }

  archiveData (id) {
    $.ajax({
      method: 'post',
      url: '/webapp/archived',
      dataType: 'json',
      data: { id },
    }).done((res) => {
      this.renderer.state.realdatas = this.renderer.state.realdatas.filter(d => d._id !== id);
      this.renderer.setState(this.renderer.state);
    }).fail(() => {
      console.log("Échec de chargement ");
    });
  }

  recoverData (id) {
    $.ajax({
      method: 'post',
      url: '/webapp/recover',
      dataType: 'json',
      data: { id },
    }).done((res) => {
      this.renderer.state.realdatas = this.renderer.state.realdatas.filter(d => d._id !== id);
      this.renderer.state.realdatas.push(this.renderer.state.datas.filter(d => d._id === id)[0]);
      this.renderer.setState(this.renderer.state);
    }).fail(() => {
      console.log("Échec de chargement ");
    });
  }

  changePageNoOption (page) {
    this.changePage(this.renderer.state.datas, page, 20, this.renderer.state.archived);
  }

  toggleArchive (event) {
    this.changePage(this.renderer.state.datas, this.renderer.state.curpage, 20, event.target.checked);
  }

  inputPage (event, renderer) {
    renderer.state.selectedpage = event.target.value;
    renderer.setState(renderer.state);
  }

  inputPageSubmit (event, renderer) {
    event.preventDefault();
    this.changePageNoOption(renderer.state.selectedpage);
  }

}
