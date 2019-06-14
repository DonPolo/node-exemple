import datamanager from '../utils/datamanager.util';
import $ from 'jquery';
import ParentController from './parent.controller';
import AnalyticsPage, { ISAnalytics } from '../pages/analytics.page';
import { AnalyticsData } from '../../types/types.util';
import { FormEvent } from 'react';
import ParentComponent from '../components/parent.component';

export default class AnalyticsController extends ParentController {
  state: ISAnalytics;
  datas: AnalyticsData[] | null;
  searchId: string;
  maxConf: number;
  constructor(render: AnalyticsPage) {
    super('analytics', 4, render);
    this.state = {
      nbpage: 0,
      archived: false,
      curpage: 1,
      realdatas: [],
    };
    this.datas = datamanager.analytics.datas;
    this.searchId = '';
    this.maxConf = 1;
    if (!this.datas) {
      this.fetch();
    } else {
      this.changePage(this.datas, 1, 20, false);
    }
    this.toggleArchive = this.toggleArchive.bind(this);
    this.changePage = this.changePage.bind(this);
    this.changePageNoOption = this.changePageNoOption.bind(this);
    this.inputPage = this.inputPage.bind(this);
  }

  fetch = () => {
    fetch('/webapp/api?query=analytics')
      .then(response => response.json())
      .then(data => {
        datamanager.analytics.datas = data.datas;
        this.datas = data;
        if (this.render.isMount) {
          this.changePage(
            data.datas,
            this.state.curpage,
            20,
            this.state.archived,
          );
        }
      });
  };

  changePage = (
    datas: AnalyticsData[],
    page: number,
    nbresult: number,
    archived: boolean,
  ) => {
    this.datas = datas;
    let realdatas = this.datas;
    if (!archived) {
      realdatas = realdatas.filter(d => !d.archived);
    }
    let nbpage = Math.trunc(realdatas.length / nbresult);
    if (realdatas.length / nbresult > nbpage) nbpage += 1;
    realdatas = datas.slice(
      (page - 1) * nbresult,
      (page - 1) * nbresult + nbresult,
    );
    this.state.nbpage = nbpage;
    this.state.archived = archived;
    this.state.curpage = page;
    this.state.realdatas = realdatas;
    this.changeState();
  };

  archiveData(id: string) {
    $.ajax({
      method: 'post',
      url: '/webapp/archived',
      dataType: 'json',
      data: { id },
    })
      .done(res => {
        this.state.realdatas = this.state.realdatas.filter(d => d._id !== id);
        this.changeState();
      })
      .fail(() => {
        // Do nothing
      });
  }

  recoverData(id: string) {
    $.ajax({
      method: 'post',
      url: '/webapp/recover',
      dataType: 'json',
      data: { id },
    })
      .done(res => {
        if (!this.datas) return;
        this.state.realdatas = this.state.realdatas.filter(d => d._id !== id);
        this.state.realdatas.push(this.datas.filter(d => d._id === id)[0]);
        this.changeState();
      })
      .fail(() => {
        // Do nothing
      });
  }

  changePageNoOption(page: number) {
    this.changePage(
      datamanager.analytics.datas
        ? datamanager.analytics.datas.filter(
            d =>
              d._id &&
              d._id.startsWith(this.searchId) &&
              d.result.confidence <= this.maxConf,
          )
        : [],
      page,
      20,
      this.state.archived,
    );
  }

  toggleArchive(event: FormEvent<HTMLInputElement>) {
    this.changePage(
      datamanager.analytics.datas
        ? datamanager.analytics.datas.filter(
            d =>
              d._id &&
              d._id.startsWith(this.searchId) &&
              d.result.confidence <= this.maxConf,
          )
        : [],
      this.state.curpage,
      20,
      event.currentTarget.checked,
    );
  }

  inputPage(event: FormEvent<HTMLInputElement>, render: ParentComponent) {
    render.state.selectedpage = event.currentTarget.value;
    render.setState(render.state);
  }

  inputPageSubmit(event: FormEvent<HTMLFormElement>, render: ParentComponent) {
    event.preventDefault();
    this.changePageNoOption(render.state.selectedpage);
  }

  searchById = (
    event: FormEvent<HTMLInputElement>,
    render: ParentComponent,
  ) => {
    render.state.searchid = event.currentTarget.value;
    render.setState(render.state);
    this.searchId = event.currentTarget.value;
    this.changePageNoOption(1);
  };

  restrictConf = (
    event: FormEvent<HTMLInputElement>,
    render: ParentComponent,
  ) => {
    render.state.conf = event.currentTarget.value.toString();
    render.setState(render.state);
    this.maxConf = parseFloat(event.currentTarget.value);
    this.changePageNoOption(1);
  };
}
