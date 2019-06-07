import $ from 'jquery';

export default class Bubble {
  element: JQuery;
  txt: string;
  name: string;
  bubble: JQuery | null;

  constructor(element: HTMLElement) {
    this.element = $(element);
    this.txt = this.element.attr('bubble') as string;
    this.name = this.element.attr('bubble-name') as string;
    this.bubble = null;
    this.element.on('mouseover', e => this.showBubble(e));
    this.element.on('mouseout', () => this.unshowBubble());
    this.element.on('mousemove', e => this.mouseMove(e));
  }

  mouseMove(ev: JQuery.MouseMoveEvent | JQuery.MouseOverEvent) {
    if (this.bubble === null) return;
    const event = ev || window.event;
    const x = event.pageX;
    const y = event.pageY;
    this.bubble.css('top', `${y + 20}px`);
    this.bubble.css('left', `${x + 10}px`);
  }

  showBubble(event: JQuery.MouseOverEvent) {
    const bubble = $(document.createElement('div'));
    bubble.addClass('bubble');
    const title = $(document.createElement('h2'));
    title.html(this.name);
    bubble.append(title);
    const text = $(document.createElement('span'));
    text.html(this.txt);
    bubble.append(text);
    $(document.body).append(bubble);
    this.bubble = bubble;
    this.mouseMove(event);
  }

  unshowBubble() {
    if (this.bubble !== null) {
      this.bubble.remove();
      this.bubble = null;
    }
  }
}
