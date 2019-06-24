import React from 'react';
import AnalyticsController from '../controllers/analytics.controller';
import ParentComponent from '../components/parent.component';
import { prettyDate } from '../utils/func.util';
import {
  AnalyticsData,
  ResultIntent,
  ResultEntity,
  IntentResult,
} from '../../types/types.util';
import Accordion from '../components/accordion.component';
// tslint:disable: max-classes-per-file

interface IPBotBar {
  curpage: number;
  archived: boolean | null;
  controller: AnalyticsController;
  nbpage: number;
}
class BottomBar extends ParentComponent<IPBotBar, { selectedpage: number }> {
  constructor(props: IPBotBar) {
    super(props);
    this.state.selectedpage = this.props.curpage;
  }

  render() {
    if (this.props.archived === null) return;
    const swi = (
      <input
        onChange={this.props.controller.toggleArchive}
        type='checkbox'
        name='archived'
        id='toggle-archive'
        checked={this.props.archived ? true : false}
      />
    );
    let prev = null;
    if (this.props.curpage > 1) {
      prev = (
        <a
          onClick={() =>
            this.props.controller.changePageNoOption(this.props.curpage - 1)
          }
        >
          <i className='fas fa-angle-left' />
        </a>
      );
    }
    let next = null;
    if (this.props.curpage < this.props.nbpage) {
      next = (
        <a
          onClick={() =>
            this.props.controller.changePageNoOption(this.props.curpage + 1)
          }
        >
          <i className='fas fa-angle-right' />
        </a>
      );
    }
    const pages = [];
    if (this.props.nbpage > 0) {
      let max = this.props.nbpage;
      let min = 1;
      if (this.props.nbpage > 5) {
        min = this.props.curpage - 2;
        if (min < 1) min = 1;
        max = min + 4;
        if (max > this.props.nbpage) {
          min -= max - this.props.nbpage;
          max = this.props.nbpage;
        }
      }
      for (let i = min; i <= max; i += 1) {
        if (i === this.props.curpage) {
          pages.push(
            <a
              key={i}
              onClick={() => this.props.controller.changePageNoOption(i)}
              className='enable'
            >
              {i}
            </a>,
          );
        } else {
          pages.push(
            <a
              key={i}
              onClick={() => this.props.controller.changePageNoOption(i)}
            >
              {i}
            </a>,
          );
        }
      }
    }
    return (
      <div className='bottom-bar'>
        <span>
          <form
            onSubmit={event =>
              this.props.controller.inputPageSubmit(event, this)
            }
          >
            Page{' '}
            <input
              type='text'
              name='page'
              value={this.state.selectedpage}
              onChange={event => this.props.controller.inputPage(event, this)}
            />
          </form>
        </span>
        <span className='pages'>
          {prev}
          {pages}
          {next}
        </span>
        <span>
          <strong>Show archived elements</strong>
          <label className='switch'>
            {swi}
            <span className='slider round' />
          </label>
        </span>
      </div>
    );
  }
}

class TopBar extends ParentComponent<{ controller: AnalyticsController }> {
  constructor(props: any) {
    super(props);
    this.state = {
      searchid: '',
      conf: '1',
    };
  }

  render() {
    return (
      <div className='top-bar'>
        <div>
          <label htmlFor='id-search'>Search by id </label>
          <input
            id='id-search'
            type='text'
            value={this.state.searchid}
            onChange={event => this.props.controller.searchById(event, this)}
          />
        </div>
        <div>
          <label htmlFor='confidence'>Max confidence</label>
          <input
            type='range'
            min='0'
            max='1'
            step='0.01'
            value={this.state.conf}
            onChange={event => this.props.controller.restrictConf(event, this)}
          />
          <input
            type='text'
            onChange={event => this.props.controller.restrictConf(event, this)}
            value={this.state.conf}
            className='little'
          />
        </div>
      </div>
    );
  }
}

class Data extends ParentComponent<{
  data: AnalyticsData;
  controller: AnalyticsController;
}> {
  render() {
    const data = this.props.data;
    let action = null;
    if (!this.props.data.archived) {
      action = (
        <span>
          <i
            className='fas fa-trash'
            onClick={() =>
              this.props.controller.archiveData(
                this.props.data._id ? this.props.data._id : '-1',
              )
            }
          />
        </span>
      );
    } else {
      action = (
        <span>
          <i
            className='fas fa-trash-restore'
            onClick={() =>
              this.props.controller.recoverData(
                this.props.data._id ? this.props.data._id : '-1',
              )
            }
          />
        </span>
      );
    }
    const intents = data.request.result.intents.map(
      (i: ResultIntent, index: number) => (
        <tr key={index}>
          <td>{i.name}</td>
          <td>{i.confidence}</td>
        </tr>
      ),
    );

    const entities = data.request.result.entities.map(
      (i: ResultEntity, index: number) => (
        <tr key={index}>
          <td>{i.name}</td>
          <td>{i.value}</td>
        </tr>
      ),
    );

    const results = data.results.map((i: IntentResult, index: number) => (
      <tr key={index}>
        <td>{i.response}</td>
        <td>{i.confidence}</td>
      </tr>
    ));
    let responses = '';
    if (data.parsedResponse && data.parsedResponse.responses) {
      responses = JSON.stringify(data.parsedResponse.responses, null, 4);
    }

    const befcontexts = JSON.stringify(data.request.result.contexts, null, 4);
    const aftcontexts = JSON.stringify(data.result.contexts, null, 4);
    return (
      <>
        <Accordion
          name={
            <>
              <span>
                Query: <i>"{this.props.data.request.result.query}"</i>
              </span>
              <span>Intent: {this.props.data.result.response}</span>
              <span>Confidence: {this.props.data.result.confidence}</span>
              <span>Date: {prettyDate(this.props.data.date)}</span>
              {action}
            </>
          }
          anim={false}
          content={
            <>
              <Accordion
                name='Request'
                anim={false}
                moreclass='request'
                content={
                  <>
                    <div>
                      <span>
                        Types : {this.props.data.request.acceptedtypes}
                      </span>
                      <span>Lang : {this.props.data.request.lang}</span>
                      <span>
                        Response : {this.props.data.request.result.response}
                      </span>
                    </div>
                    <div>
                      <span>Intents:</span>
                      <br />
                      <table>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Confidence</th>
                          </tr>
                        </thead>
                        <tbody>{intents}</tbody>
                      </table>
                    </div>
                    <div>
                      <span>Entities:</span>
                      <br />
                      <table>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Value</th>
                          </tr>
                        </thead>
                        <tbody>{entities}</tbody>
                      </table>
                    </div>
                  </>
                }
              />
              <Accordion
                name='Intent response'
                moreclass='request'
                anim={false}
                content={
                  <>
                    <pre>{responses}</pre>
                  </>
                }
              />
              <Accordion
                name='Other intents'
                anim={false}
                moreclass='request'
                content={
                  <>
                    <div>
                      <table>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Confidence</th>
                          </tr>
                        </thead>
                        <tbody>{results}</tbody>
                      </table>
                    </div>
                  </>
                }
              />
              <Accordion
                name='Before contexts'
                anim={false}
                moreclass='request'
                content={<pre>{befcontexts}</pre>}
              />
              <Accordion
                name='After contexts'
                anim={false}
                moreclass='request'
                content={<pre>{aftcontexts}</pre>}
              />
            </>
          }
        />
      </>
    );
  }
}

class Analytics extends ParentComponent<{
  datas: AnalyticsData[];
  controller: AnalyticsController;
}> {
  render() {
    let res = null;
    if (!this.props.datas) {
      res = (
        <span className='loader'>
          <img src='/pic/load.gif' />
        </span>
      );
    } else {
      res = this.props.datas.map((data: AnalyticsData, index: number) => (
        <Data key={index} data={data} controller={this.props.controller} />
      ));
    }
    return <main>{res}</main>;
  }
}

export interface ISAnalytics {
  realdatas: AnalyticsData[];
  nbpage: number;
  archived: boolean;
  curpage: number;
}

class AnalyticsPage extends ParentComponent<{}, ISAnalytics> {
  controller: AnalyticsController;
  constructor(props: {}) {
    super(props);
    this.controller = new AnalyticsController(this);
  }

  render() {
    return (
      <>
        <TopBar controller={this.controller} />
        <Analytics datas={this.state.realdatas} controller={this.controller} />
        <BottomBar
          nbpage={this.state.nbpage}
          archived={this.state.archived}
          curpage={this.state.curpage}
          controller={this.controller}
        />
      </>
    );
  }
}

export default AnalyticsPage;
