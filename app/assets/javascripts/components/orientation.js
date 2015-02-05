function Orientation($target) {
  this.$target = $target;
  this.$rotate = $target.find(".js-rotate");
}

Orientation.prototype.init = function() {
  this._paintPipeline = new PaintPipeline;
  this._orientationHandler = this._onOrientation.bind(this);

  window.addEventListener("deviceorientation", this._orientationHandler);

  function callback() {
    this.$rotate.css("transform", "rotate(" + this.rotation + "deg)");
  }

  this._paintPipeline.start(callback.bind(this));

  return this;
};

Orientation.prototype.teardown = function() {
  this._paintPipeline.stop();
  this.$rotate.css("transform", "");
  window.removeEventListener("deviceorientation", this._orientationHandler);
};

Orientation.prototype._onOrientation = function(e) {
  if (e.alpha === null) {
    // Devices may have a gyroscope as a safety measure
    // to protect mechanical hard drives but they're
    // useless for accessing direction. Because this
    // can't be detected upfront we'll just cut our losses.
    return this.teardown();
  }

  var direction = !isNaN(e.webkitCompassHeading) ? e.webkitCompassHeading : (360 - e.alpha);
  this.rotation = -(window.orientation + direction);
};
