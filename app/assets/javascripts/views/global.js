window.app.view.global = function() {

  // Toggle search panel
  var $search = $("#search");

  if ($search.length) {
    new ToggleExpanded($search).init();
  }

  // Search nearby geolocation
  var $nearby = $("#search-nearby");

  if ($nearby.length && window.support.feature("geolocation")) {
    new Nearby($nearby).init();
  }
};
