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

    // Draggable results panel
    new DraggablePanel($results).init();

    // Live result updates
    if ($results.is(".is-live") && window.support.check("geolocation")) {
      new LiveResults($results).init();

      if (window.support.check("deviceOrientation")) {
        $results.find(".js-result").each(function() {
          new LiveCompass($(this)).init();
        });
      }
    }
  }
};
