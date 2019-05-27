import $ from './jquery';

export default class Bubble {
  static bind (selector) {
    $(selector).each(e => new Bubble(e.get(0)));
  }

  constructor (element) {
    this.element = $(element);
    this.txt = this.element.attr('bubble');
    this.name = this.element.attr('bubble-name');
    this.bubble = null;
    this.element.on('mouseover', e => this.showBubble(e));
    this.element.on('mouseout', e => this.unshowBubble(e));
    this.element.on('mousemove', e => this.mouseMove(e));
  }

  mouseMove (event) {
    if (this.bubble === null) return;
    event = event || window.event;
    let x = event.pageX;
    let y = event.pageY;
    this.bubble.css('top', (y + 20)+ 'px');
    this.bubble.css('left', (x + 10) + 'px');
  }

  showBubble (event) {
    let bubble = $(document.createElement('div'));
    bubble.addClass('bubble');
    let title = $(document.createElement('h2'));
    title.html(this.name);
    bubble.append(title);
    let text = $(document.createElement('span'));
    text.html(this.txt);
    bubble.append(text);
    $(document.body).append(bubble);
    this.bubble = bubble;
    this.mouseMove(event);
  }

  unshowBubble (event) {
    if (this.bubble !== null) {
      this.bubble.remove();
      this.bubble = null;
    }
  }
}
