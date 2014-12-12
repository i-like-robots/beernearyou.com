window.app.view.venueShow = function() {

  var $lightbox = $("#lightbox");
  var $slideshow = $("#slideshow");

  if ($lightbox.length && $slideshow.length) {
    var slideshow, trigger;

    new ToggleExpanded($lightbox).init();

    $(document)
      .on("toggle:open", function() {
        if (!slideshow) {
          slideshow = new Slideshow($slideshow).init();
        }

        trigger = document.activeElement;

        slideshow.$target.focus();
      })
      .on("toggle:closed", function() {
        trigger.focus();
      });
  }

};
