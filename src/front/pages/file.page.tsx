import React from 'react';
import ParentComponent from '../components/parent.component';
import FileController from '../controllers/file.controller';
import { capitalize } from '../utils/func.util';
import Bubble from '../utils/bubble';
import { FileInfos } from '../../types/front';
import { Redirect } from 'react-router';
import Accordion from '../components/accordion.component';

// tslint:disable: max-classes-per-file
interface IPSingleFile {
  file: any;
  type: string;
  controller: FileController;
  cur: boolean;
}
class File extends ParentComponent<IPSingleFile> {
  element: any;
  bubble: Bubble;
  constructor(props: IPSingleFile) {
    super(props);
    this.element = React.createRef();
  }

  componentDidMount() {
    super.componentDidMount();
    if (this.element.current) {
      this.bubble = new Bubble(this.element.current);
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    if (this.bubble) {
      this.bubble.unshowBubble();
    }
  }

  render() {
    let elem = null;
    const f = this.props.file;
    if (this.props.type === 'training') {
      elem = (
        <a
          className={this.props.cur ? 'selected' : ''}
          onClick={() =>
            this.props.controller.changeFile(f.name, f.type, 'training')
          }
          s-val={`${f.type}.${f.name}`}
        >
          {`${capitalize(f.type)}.${capitalize(f.name)}`}
        </a>
      );
    } else {
      elem = (
        // @ts-ignore
        <a
          ref={this.element}
          className={this.props.cur ? 'selected' : ''}
          bubble-name={`${capitalize(f.type)}.${capitalize(f.beauty)}`}
          bubble={f.desc}
          onClick={() =>
            this.props.controller.changeFile(f.name, f.type, 'response')
          }
          s-val={`${f.type}.${f.name}`}
        >
          {`${capitalize(f.type)}.${capitalize(f.beauty)}`}
        </a>
      );
    }
    return <>{elem}</>;
  }
}

interface IPLeftMenu {
  controller: FileController;
  files: any;
  filename: string;
}

class LeftMenu extends ParentComponent<IPLeftMenu> {
  render() {
    let files = null;
    if (this.props.files) {
      let i = 0;
      files = [<h2 key={i}>Training</h2>];
      i += 1;
      this.props.files.training.forEach((f: any) => {
        let cur = false;
        if (`${f.type}.${f.name}` === this.props.filename) {
          cur = true;
        }
        files.push(
          <File
            controller={this.props.controller}
            cur={cur}
            file={f}
            type={'training'}
            key={i}
          />,
        );
        i += 1;
      });
      files.push(<h2 key={i}>Responses</h2>);
      i += 1;
      this.props.files.response.forEach((f: any) => {
        let cur = false;
        if (`${f.type}.${f.name}` === this.props.filename) {
          cur = true;
        }
        files.push(
          <File
            controller={this.props.controller}
            cur={cur}
            file={f}
            type={'response'}
            key={i}
          />,
        );
        i += 1;
      });
    } else {
      files = (
        <div className='loader'>
          <img src='/pic/load.gif' />
        </div>
      );
    }
    return (
      <nav>
        {
          // @ts-ignore
          <div
            className='search'
            id='search'
            search='simple'
            s-con='filecontainer'
          >
            <input type='text' placeholder='Search...' />
          </div>
        }
        <div className='container' id='filecontainer'>
          {files}
        </div>
        <div className='but'>
          <a id='savebut' onClick={this.props.controller.save}>
            Save
            <img src='/pic/load.gif' />
          </a>
        </div>
      </nav>
    );
  }
}

interface IPTopBar {
  cat: string;
  type: string;
  filename: string;
  controller: FileController;
}
class TopBar extends ParentComponent<IPTopBar> {
  render() {
    return (
      <div className='topbar'>
        <div>
          <h2>{capitalize(this.props.cat)}</h2>
          <h2>{capitalize(this.props.filename.split('.')[0])}</h2>
          <h2>{capitalize(this.props.filename.split('.')[1])}</h2>
        </div>
        <div>
          <strong>Auto save</strong>
          <label className='switch'>
            <input
              onChange={this.props.controller.toggleAutosave}
              type='checkbox'
              id='i-autosave'
            />
            <span className='slider round' />
          </label>
        </div>
      </div>
    );
  }
}

class Editor extends ParentComponent<{
  controller: FileController;
  isLoaded: boolean;
}> {
  render() {
    return (
      <>
        <textarea id='editor' />
        <span
          className='info-but'
          id='info-but'
          onClick={(event: React.MouseEvent) => {
            event.stopPropagation();
            this.props.controller.showDoc(event, true);
          }}
        >
          <i className='fas fa-info' />
        </span>
        <span className='back-but'>
          <a
            onClick={this.props.controller.backToHome}
            className='fas fa-chevron-left'
          />
        </span>
      </>
    );
  }
}
interface IPRightMenu {
  params: string[] | null;
  cat: string;
  entities: string[] | null;
  controller: FileController;
}
class RightMenu extends ParentComponent<IPRightMenu> {
  render() {
    let title = null;
    let params = null;
    if (this.props.cat === 'response') {
      title = <h2>Parameters</h2>;
      if (this.props.params === null) {
        params = (
          <div className='loader'>
            <img src='/pic/load.gif' />
          </div>
        );
      } else {
        params = this.props.params.map((param, index) => (
          <strong
            key={index}
            onClick={() => this.props.controller.clickParam(param)}
            s-val={param}
          >
            {param}
          </strong>
        ));
      }
    } else {
      title = <h2>Entities</h2>;
      if (this.props.entities === null) {
        params = (
          <div className='loader'>
            <img src='/pic/load.gif' />
          </div>
        );
      } else {
        params = this.props.entities.map((param, index) => (
          <strong
            key={index}
            onClick={() => this.props.controller.clickEntity(param)}
            s-val={param}
          >
            {param}
          </strong>
        ));
      }
    }

    return (
      <div className='rightmenu'>
        {
          // @ts-ignore
          <div
            className='search'
            id='search'
            search='simple'
            s-con='paramcontainer'
          >
            <input type='text' placeholder='Search...' />
          </div>
        }
        <div className='paramcontainer' id='paramcontainer'>
          {title}
          {params}
        </div>
      </div>
    );
  }
}

class Doc extends ParentComponent {
  render() {
    return (
      <div className='infos' id='infos'>
        <span>
          <div onClick={this.stopProp}>
            <h2>Gimme some help</h2>
            <div>
              <Accordion
                name='Desc'
                anim={true}
                content={
                  <>
                    <p>
                      The 'desc' attribute let you put a little description of
                      the response. For example when it is used, what comes next
                      etc...
                    </p>
                    <pre>
                      {`- desc: "Response used when the user ask the bot his mood"`}
                    </pre>
                  </>
                }
              />
              <Accordion
                name='Text'
                anim={true}
                content={
                  <>
                    <p>
                      The 'text' attribute in 'responses' let you add a text
                      response. This attribute is a little bit complicated to
                      understand but really simple to use because you can make
                      all kind of combinations with it's attributes.
                    </p>
                    The first attribute you have to choose is the language:
                    <ul>
                      <li>
                        'fr' if you don't want different style of language
                      </li>
                      <li>'fr-tu' for a relax language</li>
                      <li>'fr-vous' for a strict language</li>
                    </ul>
                    <p>
                      Note that if you use 'fr-tu' you have to put a 'fr-vous'.
                      <br />
                      If you want to add a condition for the different language
                      just add '-cond' after the attribute like 'fr-cond'
                    </p>
                    <p>
                      Now that you have choosen the language, if you didn't
                      specified a 'cond', you can just add a list of sentences.
                      One of them will be picked randomly to send the response.
                    </p>
                    <pre>
                      {// tslint:disable-next-line: prettier
                      `
- responses:
  - text:
      fr:
        - "How are you ?"
        - "Are you good ?"
        - "I'm fine and you ?"
  - text:
      fr-tu:
        - "You good ?"
        - "What's up ?"
      fr-vous:
        - "How are you ?"
        - "Are you fine today ?"`}
                    </pre>
                    <p>
                      If you specified a cond, you can then add a 'cond'
                      attribute which contains the condition used to choose
                      between the possibilities.
                      <br />
                      You can now choose to put the condition on 'sing' / 'plur'
                      or on 'masc' / 'fem'.
                    </p>
                    <ul>
                      <li>'masc'</li>
                      <li>'fem'</li>
                      <li>'sing'</li>
                      <li>'plur'</li>
                    </ul>
                    <p>
                      Note that you cannot choose 'sing' / 'plur' and 'masc' /
                      'fem' and that you have to put both of the pair.
                    </p>
                    <p>
                      If you really want to put 'sing' / 'plur' and 'masc' /
                      'fem', you can specify the '-cond' like before.
                      <br />
                      If you don't, your code should be like that :
                    </p>
                    <pre>
                      {// tslint:disable-next-line: prettier
                      `
- responses:
  - text:
      fr-cond:
        cond: "secretary.nb"
        sing:
          - The secretary will help you with that
          - Our secretary can help you
        plur:
          - The secretaries will help you with that
          - Our secretaries can help you`}
                    </pre>
                    <p>Then if you want both conds you will have this :</p>
                    <pre>
                      {// tslint:disable-next-line: prettier
                      `
- responses:
  - text:
      fr-cond:
        cond: "concierges.nb"
        sing-cond:
          cond: "concierges.genre"
          fem:
            - "La concierge vous accueille"
          masc:
            - "Le concierge vous accueille"
        plur:
          - "Les concierges vous accueillent"`}
                    </pre>
                  </>
                }
              />
              <Accordion
                name='Media'
                anim={true}
                content={
                  <>
                    <p>
                      The 'media' attribute in 'responses' let you add an image
                      in the response.
                      <br />
                      This attribute is really easy to use, you just have to put
                      an attribute 'value' with the url of your image.
                    </p>
                    <pre>
                      {// tslint:disable-next-line: prettier
                      `
- responses:
  - media:
      value: "https://my-site.com/my-wonderful-image"`}
                    </pre>
                    <p>
                      If you want to add some text instead of the picture if the
                      platform doesn't support the images, you can just put an
                      attribute 'alt' which acts just like 'text'.
                    </p>
                  </>
                }
              />
              <Accordion
                name='Link'
                anim={true}
                content={
                  <>
                    <p>
                      The 'link' attribute in 'responses' let you add a link to
                      a website in the response.
                      <br />
                      This attribute is really easy to use, you just have to put
                      an attribute 'value' with the url of your website.
                    </p>
                    <pre>
                      {// tslint:disable-next-line: no-trailing-whitespace
                      `
- responses:
  - link:
      value: "https://my-site.com/my-cool-page"`}
                    </pre>
                    <p>
                      If you want to add some text instead of the link if the
                      platform doesn't support the url, you can just put an
                      attribute 'alt' which acts just like 'text'.
                    </p>
                  </>
                }
              />
              <Accordion
                name='Btn'
                anim={true}
                content={
                  <>
                    <p>
                      The 'btn' attribute in 'responses' let you add buttons in
                      the response to let the user a choice.
                    </p>
                    <p>Like in 'text', you have to choose a language :</p>
                    <ul>
                      <li>
                        'fr' if you don't want different style of language
                      </li>
                      <li>'fr-tu' for a relax language</li>
                      <li>'fr-vous' for a strict language</li>
                    </ul>
                    <p>
                      Then you add an array with all of your buttons:
                      <br />
                      every butttons should have the attribute 'text' which is
                      the text of the button, 'followupintent' which is the
                      intent to trigger when we press the button and 'value'
                      which is the value to sent (as an entity) to the intent.
                    </p>
                    <pre>
                      {// tslint:disable-next-line: prettier
                      `
- responses:
  - text:
      fr:
        - "What's your favorite color"
  - btn:
      fr:
        - text: "red"
          value: "red"
          followupintent: "choosecolor"
        - text: "blue"
          value: "blue"
          followupintent: "choosecolor"
        - text: "next"
          value: ""
          followupintent: "next"`}
                    </pre>
                    <p>
                      If you want to add some text instead of the buttons if the
                      platform doesn't support them, you can just put an
                      attribute 'alt' which acts just like 'text'.
                    </p>
                  </>
                }
              />
              <Accordion
                name='Dropdown'
                anim={true}
                content={
                  <>
                    <p>
                      The 'dropdown' attribute in 'responses' let you add a
                      dropdown in the response to let the user a choice between
                      different options. This attribute is similar to 'btn'.
                    </p>
                    <p>Like in 'text', you have to choose a language :</p>
                    <ul>
                      <li>
                        'fr' if you don't want different style of language
                      </li>
                      <li>'fr-tu' for a relax language</li>
                      <li>'fr-vous' for a strict language</li>
                    </ul>
                    <p>
                      Then you add an array with all of your options:
                      <br />
                      every option should have the attribute 'text' which is the
                      text of the option, 'followupintent' which is the intent
                      to trigger when we choose the option and 'value' which is
                      the value to sent (as an entity) to the intent.
                    </p>
                    <pre>
                      {// tslint:disable-next-line: prettier
                      `
- responses:
  - text:
      fr:
        - "What's your favorite color"
  - dropdown:
      fr:
        - text: "red"
          value: "red"
          followupintent: "choosecolor"
        - text: "blue"
          value: "blue"
          followupintent: "choosecolor"
        - text: "next"
          value: ""
          followupintent: "next"`}
                    </pre>
                    <p>
                      If you want to add some text instead of the dropdown if
                      the platform doesn't support it, you can just put an
                      attribute 'alt' which acts just like 'text'.
                    </p>
                  </>
                }
              />
              <Accordion
                name='Clone'
                anim={true}
                content={
                  <>
                    <p>
                      The 'clone' attribute let you clone the content of another
                      response. It is very easy to use, you just put the name of
                      the other intent as it's value.
                    </p>
                    <pre>
                      {// tslint:disable-next-line: prettier
                      `
intent: "test.clone"
type: "test"
clone: "test.text"`}
                    </pre>
                    <p>
                      You can access to the response you cloned by selecting the
                      'clone' attribute whithout the value. And by clicking with
                      'control' key pressed. It will load you the good reponse.
                    </p>
                  </>
                }
              />
              <Accordion
                name='Foreach in text'
                anim={true}
                content={
                  <>
                    <p>
                      If you have some text you want to duplicate has many time
                      has an array. To be clearer let's say we want to show a
                      list of groups so that the user can choose one of them.
                      The groups depends on the user so we cannot make something
                      fix. You can use the foreach in text syntax.
                    </p>
                    <pre>
                      {// tslint:disable-next-line: prettier
                      `
- responses:
  - test:
      fr:
        - "Type : "
  - text:
      fr:
        - "[[ key+1 ]] - for [[ group.name ]]::foreach key, group in site.groups"`}
                    </pre>
                    <p>This response will print something like this</p>
                    <p>1 - for Axa 2 - for Adidas 3 - for Easylife</p>
                    <p>
                      Be careful of the syntax, there's no linter for this for
                      now and a little mistake will show a really bad response.
                    </p>
                  </>
                }
              />
              <Accordion
                name='Foreach for btn and dropdown'
                anim={true}
                content={
                  <>
                    <p>
                      Same as the text foreach, if you want to put a button or
                      an option in a dropdown for each element from an array,
                      you can use the btn and dropdown foreach syntax.
                    </p>
                    <pre>
                      {`
- responses:
  - btn
      foreach: "key, group in site.groups"
      fr:
        - text: "[[ group.name ]]"
        - value: "[[ key ]]"
        - followupintent: "toto"`}
                    </pre>
                    <p>
                      This will print a button for each group. You can see that
                      the value depends on the key but it can depend on the
                      group id as well.
                    </p>
                  </>
                }
              />
              <Accordion
                name='Errors and Warnings'
                anim={true}
                content={
                  <>
                    <p>
                      <strong>Errors</strong>
                      <br />
                      The errors show you problems in the Yaml syntax. <br />
                      The informations are often very easy to understand but
                      some times it can be a little tricky.
                    </p>
                    <ul>
                      <li>
                        Your code is full of red and the error says "Unexpected
                        characters near ..." : it must be a double quote note
                        closed previously
                      </li>
                      <li>
                        "Unable to parse" : look at the line of the error it can
                        be a quote, indentation or column problem
                      </li>
                      <li>
                        "You cannot define a mapping item when in a sequence" :
                        it must be an indentation problem, it means somewhere in
                        the code, you put an attribute instead of an element for
                        an array
                      </li>
                    </ul>
                    <p>
                      <strong>Warnings</strong>
                      <br />
                      The warnings show you problems in the Lifee syntax.
                    </p>
                    <ul>
                      <li>
                        "The character ' is forbidden as a delimiter use "
                        instead" : this is a rule we added to be as clear as
                        possible, when you write some text, you have to surround
                        it with ""
                      </li>
                      <li>
                        "Attribute '...' doesn't exist in the current context" :
                        this means a first level attribute is not valid
                      </li>
                      <li>
                        "Attribute '...' already exists" : this means a first
                        level attribute is already present
                      </li>
                      <li>
                        "Property of '...' must be an array" : this means you
                        must forgot the '-' character to start an array
                      </li>
                      <li>
                        "Unknown property '...' for '...'" : this means you are
                        trying to add a not valid property
                      </li>
                      <li>
                        "Property '...' for '...' must be a string" : this means
                        you made a new line without specified a text value you
                        can just put "" if you don't want to provide text
                      </li>
                      <li>
                        "Property '...' for '...' cannot be a string" : this
                        means you put text just after an attribute which should
                        be an object or an array
                      </li>
                      <li>
                        "Attribute '...' must be an array and cannot be null" :
                        this means you forgot to add value for a first level
                        attribute
                      </li>
                      <li>
                        "Unexpected line" : this means you have an indentation
                        problems
                      </li>
                      <li>
                        "Attribute '...' must be a string and cannot be an
                        object or an array" : this means a first level attribute
                        should be a string but is an object or an array
                      </li>
                      <li>
                        "Parameter '...' is not valid" : this means that a
                        parameter between '{'{{ }}'}' is not in the list on the
                        right
                      </li>
                      <li>
                        "Missing attribute '...' in '...'" : this is pretty
                        clear but the line is not specified
                      </li>
                      <li>
                        "Unknown attribute '...' for '...'" : this is pretty
                        clear but the line is not specified
                      </li>
                      <li>
                        "Parameter '...' is not valid" : this means a parameter
                        from a foreach in dropdown or btn is not valid, check
                        your foreach variables
                      </li>
                      <li>
                        "Malformed 'foreach' in text" : this means a foreach in
                        text value is malformed, check your foreach syntax
                      </li>
                      <li>
                        "Unknown parameter '...' in 'foreach' in text" : this
                        means the variable provided to a foreach in text is not
                        present in the right list
                      </li>
                    </ul>
                  </>
                }
              />
            </div>
          </div>
        </span>
      </div>
    );
  }
}

export interface IPFile {
  file: FileInfos;
}

export interface ISFile {
  files: any;
  fullfilename: string;
  fileinfos: FileInfos;
  params: string[] | null;
  entities: string[] | null;
  fileloaded: boolean;
  showDoc: boolean;
  redirect: boolean;
}

class FilePage extends ParentComponent<IPFile, ISFile> {
  controller: FileController;
  constructor(props: IPFile) {
    super(props);
    this.controller = new FileController(this, this.props);
  }

  render() {
    return (
      <>
        <LeftMenu
          controller={this.controller}
          files={this.state.files}
          filename={this.state.fullfilename}
        />
        <main onClick={this.controller.clickClone}>
          <TopBar
            cat={this.state.fileinfos.cat}
            type={this.state.fileinfos.type}
            filename={this.state.fullfilename}
            controller={this.controller}
          />
          <Editor
            controller={this.controller}
            isLoaded={this.state.fileloaded}
          />
        </main>
        <RightMenu
          params={this.state.params}
          cat={this.state.fileinfos.cat}
          entities={this.state.entities}
          controller={this.controller}
        />
        {this.state.showDoc ? <Doc /> : null}
        {this.state.redirect ? <Redirect to='/webapp/' push={true} /> : null}
      </>
    );
  }
}

export default FilePage;
