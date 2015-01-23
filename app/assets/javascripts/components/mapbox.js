function Mapbox($target, options) {
  var defaults = {
    mapOptions: {},
    mapboxURL: null,
    projectID: null,
    accessToken: null,
  };

  this.$target = $target;
  this.options = $.extend({}, defaults, options);
}

Mapbox.prototype.init = function() {
  $("head").append("<link rel='stylesheet' href='" + this.options.mapboxURL + ".css' />");
  $.getScript(this.options.mapboxURL + ".js", this._onLoad.bind(this));
  return this;
};

Mapbox.prototype._onLoad = function() {
  window.L.mapbox.accessToken = this.options.accessToken;

  this.map = this._createMap();
  this.$target.trigger("mapbox:load", [this.map]);
};

Mapbox.prototype._createMap = function() {
  return window.L.mapbox.map(this.$target.get(0), this.options.projectID, this.options.mapOptions);
};

Mapbox.prototype.createFeatureGroup = function(features) {
  return new window.L.featureGroup(features);
};

Mapbox.prototype.createMarker = function(origin, options) {
  var icon = window.L.mapbox.marker.icon(options);
  return window.L.marker(origin, { icon: icon });
};

Mapbox.prototype.updateMarkerPosition = function(marker, origin) {
  marker.setLatLng(origin);
};

Mapbox.prototype.createPopup = function(content) {
  return window.L.popup().setContent(content);
};
