window.app.view.searchNoResults = function() {
  var $map = $("#map");
  var mapbox = new Mapbox($map, window.app.mapbox).init();

  $map.one("mapbox:load", function() {
    var origin = [ $map.data("lat"), $map.data("lng") ];

    var marker = mapbox.createMarker(origin, {
      "marker-symbol": "cross",
      "marker-color": "#F86767"
    });

    marker.addTo(mapbox.map.setView(origin, 16));
  });
};
