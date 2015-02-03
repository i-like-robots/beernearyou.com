function Orientation($target) {
  this.$target = $target;
  this.$rotate = $target.find(".js-rotate");
}

Orientation.prototype.init = function() {
  this._animationFrameQueue = new AnimationFrameQueue;
  this._orientationHandler = this._onOrientation.bind(this);
  window.addEventListener("deviceorientation", this._orientationHandler);
  return this;
};

Orientation.prototype.teardown = function() {
  window.removeEventListener("deviceorientation", this._orientationHandler);
  this.$rotate.css("transform", "");
  this._animationFrameQueue.clear();
  this._lastDirection = undefined;
};

Orientation.prototype._onOrientation = function(e) {
  if (e.alpha === null) {
    // Devices may have a gyroscope as a safety measure
    // to protect mechanical hard drives but they're
    // useless for accessing direction. Because this
    // can't be detected upfront we'll just cut our losses.
    return this.teardown();
  }

  var direction = window.orientation + (!isNaN(e.webkitCompassHeading) ? e.webkitCompassHeading : (360 - e.alpha));

  if (!this._lastDirection || Math.abs(this._lastDirection - direction) > 1) {
    this._setRotation(-(this._lastDirection = direction));
  }
};

Orientation.prototype._setRotation = function(rotation) {
  this._animationFrameQueue.add(function() {
    this.$rotate.css("transform", "rotate(" + rotation + "deg)");
  }.bind(this));
};
