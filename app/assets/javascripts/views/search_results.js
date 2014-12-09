window.app.view.searchResults = function() {
  var $map = $("#map");
  var $results = $("#results");

  if ($map.length && $results.length) {
    var options = {
      mapboxURL: window.app.config.MAPBOX_URL,
      projectID: window.app.config.MAPBOX_PROJECT,
      accessToken: window.app.config.MAPBOX_TOKEN
    };

    var mapbox = new Mapbox($map, options).init();
    new ResultsMap($results, mapbox).init();

    // Draggable results panel for small screens
    var panel = new DraggablePanel($results);

    if (window.innerWidth < 720) {
      panel.init();
    }

    $(window).on("resize orientationchange", $.debounce(100, function() {
      var active = panel.$target.hasClass("is-draggable");

      if (window.innerWidth > 720 && active) {
        panel.teardown();
      } else if (window.innerWidth < 720 && !active) {
        panel.init();
      }
    }));

    // Live result updates
    if ($results.is(".is-live") && window.support.check("geolocation")) {
      new LiveResults($results, { compass: window.support.check("deviceOrientation") }).init();
    }
  }

};
