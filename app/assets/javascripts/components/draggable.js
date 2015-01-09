function Draggable($target, options) {
  var defaults = {
    dragTarget: ".js-draggable",
    callbackStart: $.noop,
    callbackEnd: $.noop,
    axis: "horizontal"
  };

  this.$target = $target;
  this.options = $.extend({}, defaults, options);
}

Draggable.prototype.init = function() {
  this.$target.on("mousedown.drag touchstart.drag", this.options.dragTarget, $.proxy(this._onStart, this));
  return this;
};

Draggable.prototype.teardown = function() {
  $(window).add(this.$target).off(".drag");
  this.reset();
};

Draggable.prototype.reset = function() {
  this.$target.css(this._prop("css"), "").removeClass("is-active");
};

Draggable.prototype._onStart = function(e) {
  var touches = e.originalEvent.touches;

  if (touches && touches.length > 1) return;

  e.preventDefault();

  var pointerPosition = this._getPosition(e);

  this._startInteraction(pointerPosition);
  this._startGesture(pointerPosition);

  this.$target
    .addClass("is-active")
    .css(this._prop("css"), this._calcRelativePosition(pointerPosition));

  $(window)
    .on("mouseup.drag touchend.drag", $.proxy(this._onEnd, this))
    .on("mousemove.drag touchmove.drag", $.proxy(this._onMove, this));

  this.options.callbackStart(this.currentPosition);
};

Draggable.prototype._onMove = function(e) {
  var pointerPosition = this._getPosition(e);
  var direction = this._prop("directions")[+(pointerPosition > this.currentPosition)];

  if (direction != this.gesture.direction) {
    this._startGesture(pointerPosition, direction);
  }

  this.$target.css(this._prop("css"), this._calcRelativePosition(this.currentPosition = pointerPosition));
};

Draggable.prototype._onEnd = function(e) {
  var now = Date.now();

  var velocity = this._calcVelocity(this.gesture, {
    position: this.currentPosition,
    time: now
  });

  $(window).off(".drag");

  this.options.callbackEnd(this.currentPosition, this.gesture.direction, now - this.interaction.time, velocity);
  this.$target.removeClass("is-active");
  this.interaction = this.gesture = null;
};

Draggable.prototype._startInteraction = function(position) {
  var targetOffset = this.$target.offsetParent().offset()[this._prop("css")];
  var pointerOffset = position - this.$target.offset()[this._prop("css")];

  this.interaction = {
    offset: targetOffset + pointerOffset,
    time: Date.now()
  };
};

Draggable.prototype._startGesture = function(position, direction) {
  this.gesture = {
    direction: direction,
    position: position,
    time: Date.now()
  };
};

Draggable.prototype._getPosition = function(e) {
  return (e.originalEvent.touches ? e.originalEvent.touches[0] : e)[this._prop("position")];
};

Draggable.prototype._calcVelocity = function(startGesture, endGesture) {
  var percentage = 100 / window[this._prop("viewport")];
  var distance = percentage * (startGesture.position - endGesture.position);
  var time = endGesture.time - startGesture.time;
  return Math.abs(distance / time);
};

Draggable.prototype._calcRelativePosition = function(position) {
  return position - this.interaction.offset;
};

Draggable.prototype._prop = function(prop) {
  var props = {
    vertical: {
      css: "top",
      position: "pageY",
      viewport: "innerHeight",
      directions: ["up", "down"]
    },
    horizontal: {
      css: "left",
      position: "pageX",
      viewport: "innerWidth",
      directions: ["left", "right"]
    }
  };

  return props[this.options.axis][prop];
};
