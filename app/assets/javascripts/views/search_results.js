window.app.view.searchResults = function() {
  var breakpoint = 720;
  var $map = $("#map");
  var $results = $("#results");

  // Setup blank map and plot the search results
  var mapbox = new Mapbox($map, window.app.mapbox).init();
  new ResultsMap($results, mapbox).init();

  // Sliding results panel for small screens
  var panel = new SlidingDrawer($results);

  window.innerWidth < breakpoint && panel.init();

  $(window).on("resize orientationchange", debounce(100, function() {
    var active = $results.hasClass("is-draggable");

    if (window.innerWidth > breakpoint && active) {
      panel.teardown();
    } else if (window.innerWidth < breakpoint && !active) {
      panel.init();
    }
  }));

  // Live result updates
  $results.is(".is-live") && window.support.feature("geolocation") && $map.one("mapbox:load", function() {
    new LiveResults($results).init();

    if (!window.support.feature("deviceOrientation")) return;

    var orientation = new Orientation($results)

    window.innerWidth > breakpoint && orientation.init();

    // If the panel is active, only live update results when it is open
    $results
      .on("panel:dragstart", function() {
        panel.isOpen && orientation.teardown();
      })
      .on("panel:dragend", function() {
        panel.isOpen && orientation.init();
      });
  });

};
