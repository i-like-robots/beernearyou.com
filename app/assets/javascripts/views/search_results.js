window.app.view.searchResults = function() {
  var $map = $("#map");
  var $results = $("#results");

  if ($map.length && $results.length) {
    var mapbox = new Mapbox($map, window.app.mapbox).init();
    new ResultsMap($results, mapbox).init();

    // Draggable results panel for small screens
    var breakpoint = 720;
    var panel = new DraggablePanel($results);

    if (window.innerWidth < breakpoint) {
      panel.init();
    }

    $(window).on("resize orientationchange", $.debounce(100, function() {
      var active = $results.hasClass("is-draggable");

      if (window.innerWidth > breakpoint && active) {
        panel.teardown();
      } else if (window.innerWidth < breakpoint && !active) {
        panel.init();
      }
    }));

    // Live result updates
    $results.is(".is-live") && window.support.feature("geolocation") && $map.one("mapbox:load", function() {
      var liveResults = new LiveResults($results, {
        compass: window.support.feature("deviceOrientation")
      });

      if (window.innerWidth > breakpoint) {
        liveResults.init();
      }

      // If the panel is active, only live update results when it is open
      $results
        .on("panel:dragstart", function() {
          panel.isOpen && liveResults.stop();
        })
        .on("panel:dragend", function() {
          panel.isOpen && liveResults.init();
        });
    });
  }

};
