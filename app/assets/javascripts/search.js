//= require components/nearby
//= require components/mapbox
//= require components/results_map
//= require components/live_results
//= require components/live_compass

$(function() {

  var options, mapbox;

  //
  // Search with geolocation API
  //

  var $nearby = $("#nearby");

  if ($nearby.length && window.navigator.geolocation) {
    new Nearby($nearby).init();
  }

  //
  // Results Mapbox integration
  //

  var $map = $("#map");
  var $results = $("#results");

  if ($map.length && $results.length) {
    options = {
      mapboxURL: window.app.config.MAPBOX_URL,
      projectID: window.app.config.MAPBOX_PROJECT,
      accessToken: window.app.config.MAPBOX_TOKEN
    };

    mapbox = new Mapbox($map, options).init();
    new ResultsMap($results, mapbox).init();

    // Live result updates
    if ($results.is(".is-live") && window.navigator.geolocation) {
      new LiveResults($results).init();

      if (window.DeviceOrientationEvent) {
        $results.find(".js-result").each(function() {
          new LiveCompass($(this)).init();
        });
      }
    }
  }

});
