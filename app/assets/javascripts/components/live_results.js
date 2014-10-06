function LiveResults($target, resultsMap, options) {
  var defaults = {
    metric: false,
    frequency: 5000
  };

  this.$target = $target;
  this.$results = $target.find(".js-result");
  this.resultsMap = resultsMap;
  this.options = $.extend({}, defaults, options);
}

LiveResults.prototype.init = function() {
  setInterval($.proxy(this._onUpdate, this), this.options.frequency);
  return this;
};

LiveResults.prototype._onUpdate = function() {
  window.navigator.geolocation.getCurrentPosition($.proxy(this._onPosition, this));
};

LiveResults.prototype._onPosition = function(pos) {
  this.position = [pos.coords.latitude, pos.coords.longitude];
  this.resultsMap.updateCenterMarker(this.position);

  this.$results.each($.proxy(this._updateResult, this));
};

LiveResults.prototype._updateResult = function(i) {
  var $result = this.$results.eq(i);
  var $bearing = $result.find(".js-bearing");
  var $distance = $result.find(".js-distance");

  var destination = [$result.data("lat"), $result.data("lng")];
  var bearing = this.calculateBearing(this.position, destination);
  var distance = this.calculateDistance(this.position, destination);

  $bearing.text(bearing.toFixed(1) + "°");
  $distance.text(distance.toFixed(2) + " " + this.units());

  $result.trigger("result:update", [distance, bearing]);
};

LiveResults.prototype._toRadians = function(coordinates) {
  return $.map(coordinates, function(component) {
    return component * (Math.PI / 180);
  });
};

LiveResults.prototype._earthRadius = function(metric) {
  var radiusKM = 6371.0;
  return metric ? radiusKM : (radiusKM * 0.621371192);
};

LiveResults.prototype.units = function() {
  return this.options.metric ? "kilometers" : "miles";
};

LiveResults.prototype.calculateBearing = function(point1, point2) {
  point1 = this._toRadians(point1);
  point2 = this._toRadians(point2);

  var deltaLat = point2[0] - point1[0];
  var deltaLng = point2[1] - point1[1];

  var bearing = (Math.atan2(deltaLat, deltaLng) * 180.0) / Math.PI;

  return (90 - bearing + 360) % 360;
};

LiveResults.prototype.calculateDistance = function(point1, point2) {

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
