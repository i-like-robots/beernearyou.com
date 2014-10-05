function LiveCompass($target, options) {
  this.$target = $target;
  this.$compass = $target.find(".js-compass");
  this.$needle = $target.find(".js-compass-needle");
}

LiveCompass.prototype.init = function() {
  this.$target.on("result:update", $.proxy(this._onUpdate, this));
  window.addEventListener("deviceorientation", $.proxy(this._onOrientation, this));
  return this;
};

LiveCompass.prototype._onUpdate = function(e, distance, bearing) {
  this.$needle.css("transform", "rotate(" + bearing + "deg)");
};

LiveCompass.prototype._onOrientation = function(e) {
  var direction = window.orientation;

  if (!isNaN(e.webkitCompassHeading)) {
    direction += e.webkitCompassHeading;
  } else {
    direction += 360 - e.alpha;
  }

  this.$compass.css("transform", "rotate(" + -direction + "deg)");
};
