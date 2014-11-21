function DraggablePanel($target) {
  this.$target = $target;
}

DraggablePanel.prototype.init = function() {
  this.$target.on("mousedown.dp touchstart.dp", ".js-draggable", $.proxy(this._onDragStart, this));
  return this;
};

DraggablePanel.prototype._onDragStart = function(e) {
  var position = this._getPosition(e);
  var touches = e.originalEvent.touches;

  if (touches && touches.length > 1) return;

  e.preventDefault();

  this.$target
    .css("top", position)
    .addClass("is-active")
    .removeClass("is-open is-closed");

  $(window)
    .on("mouseup.dp touchend.dp", $.proxy(this._onDragEnd, this))
    .on("mousemove.dp touchmove.dp", $.proxy(this._onDragMove, this));

  this._startGesture(position);
};

DraggablePanel.prototype._onDragMove = function(e) {
  var position = this._getPosition(e);
  var direction = position < this.currentPosition ? "up" : "down";

  // Treat a change of direction as a new gesture
  if (direction != this.gesture.direction) {
    this._startGesture(position, direction);
  }

  this.$target.css("top", this.currentPosition = position);
};

DraggablePanel.prototype._onDragEnd = function(e) {
  var velocity = this._calculateVelocity(this.gesture, {
    position: this.currentPosition,
    time: Date.now()
  });

  var open;

  if (velocity > 0.05) {
    open = this.gesture.direction == "up";
  } else {
    open = this.currentPosition <= (window.innerHeight / 2);
  }

  $(window).off(".dp");

  this.$target
    .css("top", "")
    .removeClass("is-active")
    .addClass("is-" + (open ? "open" : "closed"));
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
