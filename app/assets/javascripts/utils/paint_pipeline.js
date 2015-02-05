function PaintPipeline() {
}

PaintPipeline.prototype.start = function(callback) {
  var args = arguments;

  this.frameID = window.requestAnimationFrame(function() {
    callback();
    this.start.apply(this, args);
  }.bind(this));
};

PaintPipeline.prototype.stop = function() {
  window.cancelAnimationFrame(this.frameID);
};
