import React from 'react';
import accordion from '../lib/accordion';
import AnalyticsController from '../controllers/analytics.controller';
import ParentComponent from '../components/parent.component';
import { prettyDate } from '../utils/func.util';

let controller = null;

class BottomBar extends ParentComponent {
  constructor(props) {
    super(props);
    this.state.selectedpage = this.props.curpage;
  }

  render() {
    if (this.props.archived === null) return;
    let swi = (
      <input
        onChange={controller.toggleArchive}
        type="checkbox"
        name="archived"
        id="toggle-archive"
        checked={this.props.archived ? true : false}
      />
    );
    let prev = null;
    if (this.props.curpage > 1) {
      prev = (
        <a
          onClick={() => controller.changePageNoOption(this.props.curpage - 1)}
        >
          <i className="fas fa-angle-left" />
        </a>
      );
    }
    let next = null;
    if (this.props.curpage < this.props.nbpage) {
      next = (
        <a
          onClick={() => controller.changePageNoOption(this.props.curpage + 1)}
        >
          <i className="fas fa-angle-right" />
        </a>
      );
    }
    let pages = [];
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
      for (let i = min; i <= max; i++) {
        if (i == this.props.curpage) {
          pages.push(
            <a
              key={i}
              onClick={() => controller.changePageNoOption(i)}
              className="enable"
            >
              {i}
            </a>,
          );
        } else {
          pages.push(
            <a key={i} onClick={() => controller.changePageNoOption(i)}>
              {i}
            </a>,
          );
        }
      }
    }
    return (
      <div className="bottom-bar">
        <span>
          <form onSubmit={() => controller.inputPageSubmit(event, this)}>
            Page:
            <input
              type="text"
              name="page"
              value={this.state.selectedpage}
              onChange={() => controller.inputPage(event, this)}
            />
          </form>
        </span>
        <span className="pages">
          {prev}
          {pages}
          {next}
        </span>
        <span>
          <strong>Show archived elements</strong>
          <label className="switch">
            {swi}
            <span className="slider round" />
          </label>
        </span>
      </div>
    );
  }
}

class Data extends ParentComponent {
  render() {
    let data = this.props.data;
    let action = null;
    if (!this.props.data.archived) {
      action = (
        <span>
          <i
            className="fas fa-trash"
            archive={this.props.data._id}
            onClick={() => controller.archiveData(this.props.data._id)}
          />
        </span>
      );
    } else {
      action = (
        <span>
          <i
            className="fas fa-trash-restore"
            recover={this.props.data._id}
            onClick={() => controller.recoverData(this.props.data._id)}
          />
        </span>
      );
    }
    let intents = data.request.result.intents.map((i, index) => (
      <tr key={index}>
        <td>{i.name}</td>
        <td>{i.confidence}</td>
      </tr>
    ));

    let entities = data.request.result.entities.map((i, index) => (
      <tr key={index}>
        <td>{i.name}</td>
        <td>{i.value}</td>
      </tr>
    ));

    let results = data.results.map((i, index) => (
      <tr key={index}>
        <td>{i.response.intent}</td>
        <td>{i.confidence}</td>
      </tr>
    ));
    let responses = JSON.stringify(data.parsedResponse.responses, null, 4);
    let befcontexts = JSON.stringify(data.request.result.contexts, null, 4);
    let aftcontexts = JSON.stringify(data.result.contexts, null, 4);
    return (
      <>
        <div
          className="accordion"
          onClick={accordion.noAnim}
          id="{ this.props.data._id }"
        >
          <span>
            Query: <i>"{this.props.data.request.result.query}"</i>
          </span>
          <span>Intent: {this.props.data.result.response.intent}</span>
          <span>Confidence: {this.props.data.result.confidence}</span>
          <span>Date: {prettyDate(this.props.data.date)}</span>
          {action}
        </div>
        <div className="panel">
          <div className="accordion" onClick={accordion.noAnim}>
            Request
          </div>
          <div className="panel request">
            <div>
              <span>Types : {this.props.data.request.acceptedtypes}</span>
              <span>Lang : {this.props.data.request.lang}</span>
              <span>Response : {this.props.data.request.result.response}</span>
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
          </div>
          <div className="accordion" onClick={accordion.noAnim}>
            Intent response
          </div>
          <div className="panel">
            <pre>{responses}</pre>
          </div>
          <div className="accordion" onClick={accordion.noAnim}>
            Other intents
          </div>
          <div className="panel">
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
          </div>
          <div className="accordion" onClick={accordion.noAnim}>
            Before Contexts
          </div>
          <div className="panel">
            <pre>{befcontexts}</pre>
          </div>
          <div className="accordion" onClick={accordion.noAnim}>
            After Contexts
          </div>
          <div className="panel">
            <pre>{aftcontexts}</pre>
          </div>
        </div>
      </>
    );
  }
}

class Analytics extends ParentComponent {
  render() {
    if (this.props.datas === null) return;
    const datas = this.props.datas.map((data, index) => (
      <Data key={index} data={data} />
    ));
    return <main>{datas}</main>;
  }
}

class Page extends ParentComponent {
  constructor(props) {
    super(props);
    controller = new AnalyticsController(this);
  }

  render() {
    return (
      <>
        <Analytics datas={this.state.realdatas} />
        <BottomBar
          nbpage={this.state.nbpage}
          archived={this.state.archived}
          curpage={this.state.curpage}
        />
      </>
    );
  }
}

export default Page;
