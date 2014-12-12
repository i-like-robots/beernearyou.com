window.app.view.venueShow = function() {

  // Venue location map
  var $map = $("#map");

  if ($map.length) {
    var origin = [$map.data("lat"), $map.data("lng")];

    var options = {
      mapboxURL: window.app.config.MAPBOX_URL,
      projectID: window.app.config.MAPBOX_PROJECT,
      accessToken: window.app.config.MAPBOX_TOKEN
    };

    var mapbox = new Mapbox($map, options).init();

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
