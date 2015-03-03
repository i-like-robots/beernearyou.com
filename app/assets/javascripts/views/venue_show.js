window.app.view.venueShow = function() {

  // Venue location map
  var $map = $("#map");
  var mapbox = new Mapbox($map, window.app.mapbox).init();

  $map.one("mapbox:load", function() {
    var origin = [ $map.data("lat"), $map.data("lng") ];

    var marker = mapbox.createMarker(origin, {
      "marker-symbol": "beer",
      "marker-color": "#3CA0D3"
    });

    marker.addTo(mapbox.map.setView(origin, 16));
  });

  // Setup gallery with a slideshow in a lightbox
  var $lightbox = $("#lightbox");
  var $slideshow = $("#slideshow");

  new Lightbox($lightbox).init();
  new ToggleExpanded($lightbox, { animation: window.support.prefix("animationEnd") }).init();

  var prevButton = [
    "<span class='Icon Icon--white Icon--left'>",
      "<span class='u-hidden'>Previous</span>",
    "</span>"
  ];

  var nextButton = [
    "<span class='Icon Icon--white Icon--right'>",
      "<span class='u-hidden'>Next</span>",
    "</span>"
  ];

  var slideshow = new Slideshow($slideshow, {
    prevText: prevButton.join(""),
    nextText: nextButton.join(""),
    transition: window.support.prefix("transitionEnd"),
    touch: window.support.feature("touch")
  });

  $lightbox
    .one("toggle:open", function() {
      slideshow.init();
    })
    .on("toggle:open", function() {
      $(window).on("keyup.slideshow", function(e) {
        if (slideshow.$target.hasClass("is-transitioning")) return;

        e.keyCode == 37 && slideshow.prev();
        e.keyCode == 39 && slideshow.next();
      });
    })
    .on("toggle:close", function() {
      $(window).off("keyup.slideshow");
    });

};
