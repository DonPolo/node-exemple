import $ from './jquery';

const initAccordionWithAnim = () => {
  $(".accordion").on("click", function() {
    $(this).toggleClass("active");
    const panel = $(this).next();
    if (panel.css('max-height') !== '0px'){
      panel.css('max-height', '0px');
    } else {
      panel.css('max-height', panel.prop('scrollHeight') + "px");
    }
  });
}

const initAccordionNoAnim = () => {
  $(".accordion").on('click', function () {
    $(this).toggleClass("active");
    const panel = $(this).next();
    panel.toggle();
  });
}

export default {
  initAccordionWithAnim,
  initAccordionNoAnim,
};
