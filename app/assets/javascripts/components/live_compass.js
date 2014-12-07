function LiveCompass($target, options) {
  this.$target = $target;
  this.$compass = $target.find(".js-compass");
  this.$needle = $target.find(".js-compass-needle");
}

LiveCompass.prototype.init = function() {
  this.$target.on("result:update", $.proxy(this._onUpdate, this));

  this._onOrientationProxy = $.throttle(100, $.proxy(this._onOrientation, this));
  window.addEventListener("deviceorientation", this._onOrientationProxy);

  return this;
};

LiveCompass.prototype._onUpdate = function(e, distance, bearing) {
  this.$needle.css("transform", "rotate(" + bearing + "deg)");
};

LiveCompass.prototype._onOrientation = function(e) {
  var direction = window.orientation;

  if (e.alpha == null) {
    // Devices may have a gyroscope as a safety measure
    // to protect mechanical hard drives but they're
    // useless for accessing direction. Because this
    // can't be detected upfront we'll just cut our losses.
    window.removeEventListener("deviceorientation", this._onOrientationProxy);
  }

  if (!isNaN(e.webkitCompassHeading)) {
    direction += e.webkitCompassHeading;
  } else {
    direction += 360 - e.alpha;
  }

  this.$compass.css("transform", "rotate(" + -direction + "deg)");
};
