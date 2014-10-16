window.app.view.searchIndex = function() {
  var $nearby = $("#nearby");

  if ($nearby.length && window.support.check("geolocation")) {
    new Nearby($nearby).init();
  }
};
