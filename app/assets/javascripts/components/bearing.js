var TO_RADIANS = Math.PI / 180;

function Bearing($target, options) {
  var defaults = {
    frequency: 5000
  };

  this.$target = $target;
  this.$bearing = $target.find(".js-bearing");
  this.options = $.extend({}, defaults, options);
}

Bearing.prototype.init = function() {
  this.tick = setInterval($.proxy(this._onUpdate, this), this.options.frequency);
  return this;
};

Bearing.prototype._onUpdate = function() {
  window.navigator.geolocation.getCurrentPosition($.proxy(this._onPosition, this));
};

Bearing.prototype._onPosition = function(pos) {
  var destination = [this.$target.data("lat"), this.$target.data("lng")];
  var position = [pos.coords.latitude, pos.coords.longitude];
  var bearing = this.calculateBearing(position, destination);

  this.$bearing.text(bearing.toFixed(1) + "°");
};

Bearing.prototype.calculateBearing = function(point1, point2) {
  var lat1 = point1[0] * TO_RADIANS;
  var lat2 = point2[0] * TO_RADIANS;

  var deltaLat = (point2[0] - point1[0]) * TO_RADIANS;
  var deltaLng = (point2[1] - point1[1]) * TO_RADIANS;

  var bearing = (Math.atan2(deltaLat, deltaLng) * 180.0) / Math.PI;

  return (90 - bearing + 360) % 360;
};
