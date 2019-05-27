import $ from './jquery';

const noAnim = (event) => {
  let thi = $(event.target);
  while(!thi.hasClass('accordion')) {
    thi = thi.parent();
  }
  thi.toggleClass('active');
  const panel = thi.next();
  if (panel.get(0).style.display) {
    panel.get(0).style.display = null;
  } else {
    panel.get(0).style.display = 'flex';
  }
}

const withAnim = (event) => {
  let thi = $(event.target);
  while(!thi.hasClass('accordion')) {
    thi = thi.parent();
  }
  thi.toggleClass("active");
  const panel = thi.next();
  if (panel.css('max-height') !== '0px'){
    panel.css('max-height', '0px');
  } else {
    panel.css('max-height', panel.prop('scrollHeight') + "px");
  }
}

export default {
  noAnim,
  withAnim,
};
