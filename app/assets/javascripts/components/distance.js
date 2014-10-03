var EARTH_RADIUS_KM = 6371.0;
var KM_TO_MILES = 0.621371192;
var TO_RADIANS = Math.PI / 180;

function Distance($target, options) {
  var defaults = {
    metric: false,
    frequency: 5000
  };


  this.$target = $target;
  this.$distance = $target.find(".js-distance");
  this.options = $.extend({}, defaults, options);
}

Distance.prototype.init = function() {
  this.tick = setInterval($.proxy(this._onUpdate, this), this.options.frequency);
  return this;
};

Distance.prototype._onUpdate = function() {
  window.navigator.geolocation.getCurrentPosition($.proxy(this._onPosition, this));
};

Distance.prototype._onPosition = function(pos) {
  var destination = [this.$target.data("lat"), this.$target.data("lng")];
  var position = [pos.coords.latitude, pos.coords.longitude];
  var distance = this.calculate(position, destination);

  this.$distance.text(distance.toFixed(2) + " " + this.units());
};

Distance.prototype._earthRadius = function(unit) {
  radius = EARTH_RADIUS_KM;

  if (unit == "miles") {
    radius = radius * KM_TO_MILES;
  }

  return radius;
};

Distance.prototype.units = function() {
  return this.options.metric ? "kilometers" : "miles";
};

Distance.prototype.calculate = function(point1, point2) {

  // Haversine formula
  // <http://www.movable-type.co.uk/scripts/latlong.html>

  var lat1 = point1[0] * TO_RADIANS;
  var lat2 = point2[0] * TO_RADIANS;

  var deltaLat = (point2[0] - point1[0]) * TO_RADIANS;
  var deltaLng = (point2[1] - point1[1]) * TO_RADIANS;

  var a = Math.sin(deltaLat / 2)
    * Math.sin(deltaLat / 2)
    + Math.cos(lat1)
    * Math.cos(lat2)
    * Math.sin(deltaLng / 2)
    * Math.sin(deltaLng / 2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return c * this._earthRadius(this.units());
};
