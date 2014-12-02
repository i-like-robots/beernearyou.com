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
  $(window).off(".dp");
  this.$target.off(".dp").removeClass("is-draggable is-closed is-open");
};

DraggablePanel.prototype._onStart = function(e) {
  var touches = e.originalEvent.touches;

  if (touches && touches.length > 1) return;

  e.preventDefault();

  var pointerPosition = this._getPosition(e);

  this._startInteraction(pointerPosition);
  this._startGesture(pointerPosition);

  this.$target
    .addClass("is-active")
    .removeClass("is-open is-closed")
    .css("top", this._calcRelativePosition(pointerPosition));

  $(window)
    .on("mouseup.dp touchend.dp", $.proxy(this._onEnd, this))
    .on("mousemove.dp touchmove.dp", $.proxy(this._onMove, this));
};

DraggablePanel.prototype._onMove = function(e) {
  var pointerPosition = this._getPosition(e);
  var direction = pointerPosition < this.currentPosition ? "up" : "down";

  // Treat a change of direction as a new gesture
  if (direction != this.gesture.direction) {
    this._startGesture(pointerPosition, direction);
  }

  this.currentPosition = pointerPosition;

  this.$target.css("top", this._calcRelativePosition(pointerPosition));
};

DraggablePanel.prototype._onEnd = function(e) {
  var now = Date.now();

  var velocity = this._calcVelocity(this.gesture, {
    position: this.currentPosition,
    time: now
  });

  if ((now - this.interaction.time) < 100) {
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

  this.interaction = this.gesture = null;
};

DraggablePanel.prototype._startInteraction = function(position) {
  var targetOffset = this.$target.offsetParent().offset().top;
  var pointerOffset = position - this.$target.offset().top;

  this.interaction = {
    offset: targetOffset + pointerOffset,
    time: Date.now()
  };
};

DraggablePanel.prototype._startGesture = function(position, direction) {
  this.gesture = {
    direction: direction,
    position: position,
    time: Date.now()
  };
};

DraggablePanel.prototype._getPosition = function(e) {
  return e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.pageY;
};

DraggablePanel.prototype._calcVelocity = function(startGesture, endGesture) {
  var distance = (100 / window.innerHeight) * (startGesture.position - endGesture.position);
  var time = endGesture.time - startGesture.time;
  return Math.abs(distance / time);
};

DraggablePanel.prototype._calcRelativePosition = function(position) {
  return position - this.interaction.offset;
};
