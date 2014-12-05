window.app.view.venueShow = function() {
  var $slideshow = $(".js-slideshow");

  if ($slideshow.length) {
    new Slideshow($slideshow).init();
  }
};
