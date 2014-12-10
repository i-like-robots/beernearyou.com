window.app.view.venueShow = function() {

  var $lightbox = $("#lightbox");
  var $slideshow = $("#slideshow");

  if ($lightbox.length && $slideshow.length) {
    new ToggleExpanded($lightbox).init();

    $(document).one("toggle:open", function() {
      new Slideshow($slideshow).init();
    });
  }

};
