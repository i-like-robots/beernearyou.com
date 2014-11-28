function DraggablePanel($target) {
  this.$target = $target;
}

DraggablePanel.prototype.init = function() {
  this.$target
    .addClass("is-draggable is-closed")
    .on("mousedown.dp touchstart.dp", ".js-draggable", $.proxy(this._onStart, this));

  return this;
};

DraggablePanel.prototype.teardown = function() {
  this.$target.off(".dp").removeClass("is-draggable is-closed is-open");
};

DraggablePanel.prototype._onStart = function(e) {
  var touches = e.originalEvent.touches;

  if (touches && touches.length > 1) return;

  e.preventDefault();

  this.adjustPosition = this._getPosition(e) - this.$target.offset().top;
  this.offsetPosition = this.$target.offsetParent().offset();
  this.touchStartTime = Date.now();

  var position = this._getRelativePosition(e);

  this.$target
    .css("top", position)
    .addClass("is-active")
    .removeClass("is-open is-closed");

  $(window)
    .on("mouseup.dp touchend.dp", $.proxy(this._onEnd, this))
    .on("mousemove.dp touchmove.dp", $.proxy(this._onMove, this));

  this._startGesture(position);
};

DraggablePanel.prototype._onMove = function(e) {
  var position = this._getRelativePosition(e);
  var direction = position < this.currentPosition ? "up" : "down";

  // Treat a change of direction as a new gesture
  if (direction != this.gesture.direction) {
    this._startGesture(position, direction);
  }

  this.$target.css("top", this.currentPosition = position);
};

DraggablePanel.prototype._onEnd = function(e) {
  var now = Date.now();
  var velocity = this._calculateVelocity(this.gesture, {
    position: this.currentPosition,
    time: now
  });

  if ((now - this.touchStartTime) < 100) {
    this.isOpen = !this.isOpen;
  } else if (velocity > 0.05) {
    this.isOpen = this.gesture.direction == "up";
  } else {
    this.isOpen = this.currentPosition <= (window.innerHeight / 2);
  }

  $(window).off(".dp");

  this.$target
    .css("top", "")
    .removeClass("is-active")
    .addClass("is-" + (this.isOpen ? "open" : "closed"));
};

DraggablePanel.prototype._startGesture = function(position, direction) {
  this.gesture = {
    direction: direction,
    position: position,
    time: Date.now()
  };
};

DraggablePanel.prototype._calculateVelocity = function(startGesture, endGesture) {
  var distance = (100 / window.innerHeight) * (startGesture.position - endGesture.position);
  var time = endGesture.time - startGesture.time;
  return Math.abs(distance / time);
};

DraggablePanel.prototype._getPosition = function(e) {
  return e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.pageY;
};

DraggablePanel.prototype._getRelativePosition = function(e) {
  var position = this._getPosition(e);
  return position - this.adjustPosition - this.offsetPosition.top;
};
