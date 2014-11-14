window.app.view.searchIndex = function() {
  var $nearby = $("#search-nearby");

  if ($nearby.length && window.support.check("geolocation")) {
    new Nearby($nearby).init();
  }
};
