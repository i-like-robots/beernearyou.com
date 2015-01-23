function ResultsMap($target, mapbox) {
  this.$target = $target;
  this.$results = $target.find(".js-result");
  this.mapbox = mapbox;
}

ResultsMap.prototype.init = function() {
  this.$target.on("position:update", this._onUpdate.bind(this));
  this.mapbox.$target.one("mapbox:load", this._onLoad.bind(this));
  return this;
};

ResultsMap.prototype._onLoad = function() {
  var features = this.createFeatures();
  var group = this.mapbox.createFeatureGroup(features);

  group.addTo(this.mapbox.map);
  this.mapbox.map.fitBounds(group.getBounds());
};

ResultsMap.prototype._onUpdate = function(e, origin) {
  this.mapbox.updateMarkerPosition(this.centerMarker, origin);
};

ResultsMap.prototype.createFeatures = function() {
  var i, len, marker, $result;
  var features = [];

  for (i = 0, len = this.$results.length; i < len; i++) {
    features.push(marker = this.createResultMarker($result = this.$results.eq(i)));
    this.associateResultWithMarker($result, marker);
  }

  this.centerMarker = this.createCenterMarker(this.$target);
  features.push(this.centerMarker);

  return features;
};

ResultsMap.prototype.createCenterMarker = function($target) {
  var origin = [ $target.data("lat"), $target.data("lng") ];
  var options = {
    "marker-symbol": "cross",
    "marker-color": "#F86767"
  };

  return this.createMarker(origin, options, null);
};

ResultsMap.prototype.createResultMarker = function($result) {
  var $link = $result.find("a");
  var $address = $result.find("address");

  var origin = [ $result.data("lat"), $result.data("lng") ];

  var options = {
    "marker-symbol": "beer",
    "marker-color": "#3CA0D3"
  };

  var content = [
    "<a href='" + $link.attr("href") + "'>" + $link.attr("title") + "</a>",
    "<div>" + $address.text() + "</div>"
  ];

  return this.createMarker(origin, options, content.join(""));
};

ResultsMap.prototype.createMarker = function(origin, options, content) {
  var marker = this.mapbox.createMarker(origin, options);

  if (content) {
    var popup = this.mapbox.createPopup(content);
    marker.bindPopup(popup);
  }

  return marker;
};

ResultsMap.prototype.associateResultWithMarker = function($result, marker) {
  $result
    .on("mouseenter", function() {
      marker.openPopup();
    })
    .on("mouseleave", function() {
      marker.closePopup();
    });

  marker
    .on("mouseover" , function(e) {
      $result.addClass("is-active");
    })
    .on("mouseout", function() {
      $result.removeClass("is-active");
    });
};
