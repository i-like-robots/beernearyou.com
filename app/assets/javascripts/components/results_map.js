function ResultsMap($target, mapbox) {
  this.$target = $target;
  this.mapbox = mapbox;
}

ResultsMap.prototype.init = function() {
  this.$target.on("position:update", $.proxy(this._onUpdate, this));
  this.mapbox.$target.on("mapbox:load", $.proxy(this._onLoad, this));
  return this;
};

ResultsMap.prototype._onLoad = function() {
  var $results = this.$target.children();
  var features = this.createFeatures($results);
  var group = this.mapbox.createFeatureGroup(features);

  group.addTo(this.mapbox.map);
  this.mapbox.map.fitBounds(group.getBounds());
};

ResultsMap.prototype._onUpdate = function(e, origin) {
  this.mapbox.updateMarkerPosition(this.centerMarker, origin);
};

ResultsMap.prototype.createFeatures = function($results) {
  var i, len;
  var features = [];

  for (i = 0, len = $results.length; i < len; i++) {
    features.push(this.createResultMarker($results.eq(i)));
  }

  this.centerMarker = this.createCenterMarker(this.$target);
  features.push(this.centerMarker);

  return features;
};

ResultsMap.prototype.createCenterMarker = function($target) {
  var origin = [ $target.data("lat"), $target.data("lng") ];
  var content = "Your search location";
  var options = {
    "marker-symbol": "cross",
    "marker-color": "#F86767"
  };

  return this.createMarker(origin, options, content);
};

ResultsMap.prototype.createResultMarker = function($result) {
  var origin = [ $result.data("lat"), $result.data("lng") ];
  var content = $result.find("a").get(0).outerHTML;
  var options = {
    "marker-symbol": "beer",
    "marker-color": "#3CA0D3"
  };

  return this.createMarker(origin, options, content);
};

ResultsMap.prototype.createMarker = function(origin, options, content) {
  var marker = this.mapbox.createMarker(origin, options);
  var popup = this.mapbox.createPopup(content);
  return marker.bindPopup(popup);
};
