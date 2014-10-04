function DistanceBearing($target, options) {
  var defaults = {
    metric: false,
    frequency: 5000
  };

  this.$target = $target;
  this.$bearing = $target.find(".js-bearing");
  this.$distance = $target.find(".js-distance");
  this.options = $.extend({}, defaults, options);
}

DistanceBearing.prototype.init = function() {
  setInterval($.proxy(this._onUpdate, this), this.options.frequency);
  return this;
};

DistanceBearing.prototype._onUpdate = function() {
  window.navigator.geolocation.getCurrentPosition($.proxy(this._onPosition, this));
};

DistanceBearing.prototype._onPosition = function(pos) {
  var destination = [this.$target.data("lat"), this.$target.data("lng")];
  var position = [pos.coords.latitude, pos.coords.longitude];
  var bearing = this.calculateBearing(position, destination);
  var distance = this.calculateDistance(position, destination);

  this.$bearing.text(bearing.toFixed(1) + "°");
  this.$distance.text(distance.toFixed(2) + " " + this.units());
};

DistanceBearing.prototype._toRadians = function(coordinates) {
  return $.map(coordinates, function(component) {
    return component * (Math.PI / 180);
  });
};

DistanceBearing.prototype._earthRadius = function(metric) {
  var radiusKM = 6371.0;
  return metric ? radiusKM : (radiusKM * 0.621371192);
};

DistanceBearing.prototype.units = function() {
  return this.options.metric ? "kilometers" : "miles";
};

DistanceBearing.prototype.calculateBearing = function(point1, point2) {
  point1 = this._toRadians(point1);
  point2 = this._toRadians(point2);

  var deltaLat = point2[0] - point1[0];
  var deltaLng = point2[1] - point1[1];

  var bearing = (Math.atan2(deltaLat, deltaLng) * 180.0) / Math.PI;

  return (90 - bearing + 360) % 360;
};

DistanceBearing.prototype.calculateDistance = function(point1, point2) {

  // Haversine formula
  // <http://www.movable-type.co.uk/scripts/latlong.html>

  point1 = this._toRadians(point1);
  point2 = this._toRadians(point2);

  var deltaLat = point2[0] - point1[0];
  var deltaLng = point2[1] - point1[1];

  var a = Math.sin(deltaLat / 2)
    * Math.sin(deltaLat / 2)
    + Math.cos(point1[0])
    * Math.cos(point2[0])
    * Math.sin(deltaLng / 2)
    * Math.sin(deltaLng / 2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return c * this._earthRadius(this.options.metric);
};
