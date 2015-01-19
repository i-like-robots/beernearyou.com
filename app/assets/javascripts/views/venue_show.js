window.app.view.venueShow = function() {

  // Venue location map
  var $map = $("#map");

  if ($map.length) {
    var origin = [ $map.data("lat"), $map.data("lng") ];
    var mapbox = new Mapbox($map, window.app.mapbox).init();

    $map.one("mapbox:load", function() {
      var origin = [$map.data("lat"), $map.data("lng")];

      var marker = mapbox.createMarker(origin, {
        "marker-symbol": "beer",
        "marker-color": "#3CA0D3"
      });

      marker.addTo(mapbox.map.setView(origin, 16));
    });
  }

  // Setup gallery with a slideshow in a lightbox
  var $lightbox = $("#lightbox");
  var $slideshow = $("#slideshow");

  if ($lightbox.length && $slideshow.length) {
    new Lightbox($lightbox).init();
    new ToggleExpanded($lightbox, { animation: window.support.prefix("animationEnd") }).init();

    $lightbox.one("toggle:open", function() {
      var options = {
        prevText: "<span class='Icon Icon--white Icon--left'><span class='u-hidden'>Previous</span></span>",
        nextText: "<span class='Icon Icon--white Icon--right'><span class='u-hidden'>Next</span></span>",
        transition: window.support.prefix("transitionEnd"),
        touch: window.ontouchstart !== undefined
      };

      new Slideshow($slideshow, options).init();
    });
  }

};
