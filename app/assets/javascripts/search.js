//= require components/nearby

$(function() {

  var $nearby = $("#nearby");

  if ($nearby.length && window.navigator.geolocation) {
    new Nearby($nearby).init();
  }

});
