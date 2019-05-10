class Bubble {
  static bind (selector) {
    document.querySelectorAll(selector).forEach(e => new Bubble(e));
  }

  constructor (element) {
    this.element = element;
    this.txt = element.getAttribute('bubble');
    this.name = element.getAttribute('bubble-name');
    this.bubble = null;
    element.addEventListener('mouseover', e => this.showBubble(e));
    element.addEventListener('mouseout', e => this.unshowBubble(e));
    element.addEventListener('mousemove', e => this.mouseMove(e));
  }

  mouseMove (event) {
    if (this.bubble === null) return;
    event = event || window.event;
    let x = event.pageX;
    let y = event.pageY;
    this.bubble.style.top = (y + 20)+ 'px';
    this.bubble.style.left = (x + 10) + 'px';
  }

  showBubble (event) {
    let bubble = document.createElement('div');
    bubble.classList.add('bubble');
    let title = document.createElement('h2');
    title.textContent = this.name;
    bubble.appendChild(title);
    let text = document.createElement('span');
    text.textContent = this.txt;
    bubble.appendChild(text);
    document.body.appendChild(bubble);
    this.bubble = bubble;
    this.mouseMove(event);
  }

  unshowBubble (event) {
    if (this.bubble !== null) {
      document.body.removeChild(this.bubble);
      this.bubble = null;
    }
  }
}
