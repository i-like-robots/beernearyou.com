window.app.view.searchResults = function() {
  var $map = $("#map");
  var $results = $("#results");

  if ($map.length && $results.length) {
    var mapbox = new Mapbox($map, window.app.mapbox).init();
    new ResultsMap($results, mapbox).init();

    // Draggable results panel for small screens
    var panel = new DraggablePanel($results);

    if (window.innerWidth < 720) {
      panel.init();
    }

    $(window).on("resize orientationchange", $.debounce(250, function() {
      var active = panel.$target.hasClass("is-draggable");

      if (window.innerWidth > 720 && active) {
        panel.teardown();
      } else if (window.innerWidth < 720 && !active) {
        panel.init();
      }
    }));

    // Live result updates
    if ($results.is(".is-live") && window.support.feature("geolocation")) {
      new LiveResults($results, { compass: window.support.feature("deviceOrientation") }).init();
    }
  }

};
