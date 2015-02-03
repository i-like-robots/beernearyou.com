function Draggable($target, options) {
  var defaults = {
    handle: ".js-draggable",
    callbackStart: $.noop,
    callbackEnd: $.noop,
    axis: "horizontal",
  };

  this.options = $.extend({}, defaults, options);

  this.$target = $target;
  this.$handle = $target.find(this.options.handle);

  // Native event API is ~50% faster than .on()/.off()
  this._touchcancelHandler = this._onTouchcancel.bind(this);
  this._touchstartHandler = this._onTouchstart.bind(this);
  this._touchmoveHandler = this._onTouchmove.bind(this);
  this._touchendHandler = this._onTouchend.bind(this);

  this._animationFrameQueue = new AnimationFrameQueue;
}

Draggable.prototype.init = function() {
  this.$handle[0].addEventListener("touchstart", this._touchstartHandler);
  return this;
};

Draggable.prototype.teardown = function() {
  this.$handle[0].removeEventListener("touchstart", this._touchstartHandler);
  this.$target.hasClass("is-active") && this._onTouchcancel();
  this.reset();
};

Draggable.prototype.reset = function() {
  this.$target.css("transform", "");
};

Draggable.prototype._addListeners = function() {
  window.addEventListener("touchcancel", this._touchcancelHandler);
  window.addEventListener("touchmove", this._touchmoveHandler);
  window.addEventListener("touchend", this._touchendHandler);
};

Draggable.prototype._removeListeners = function() {
  window.removeEventListener("touchcancel", this._touchcancelHandler);
  window.removeEventListener("touchmove", this._touchmoveHandler);
  window.removeEventListener("touchend", this._touchendHandler);
};

Draggable.prototype._onTouchstart = function(e) {
  if (e.touches && e.touches.length > 1) return;

  var pointerPosition = this.currentPosition = this._getPosition(e);

  this.$target.addClass("is-active");

  this.gesture = this._createGesture(pointerPosition, null);
  this.interaction = this._createInteraction(pointerPosition);

  this._setPosition(this._calcRelativePosition(pointerPosition));
  this._addListeners();

  this.options.callbackStart();

  e.preventDefault();
};

Draggable.prototype._onTouchmove = function(e) {
  var pointerPosition = this._getPosition(e);
  var direction = this._prop("directions")[+(pointerPosition > this.currentPosition)];

  if (direction != this.gesture.direction) {
    this.gesture = this._createGesture(pointerPosition, direction);
  }

  this._setPosition(this._calcRelativePosition(this.currentPosition = pointerPosition));
};

Draggable.prototype._onTouchend = function() {
  var now = Date.now();

  var velocity = this._calcVelocity(this.gesture, {
    position: this.currentPosition,
    time: now
  });

  var totalTime = now - this.interaction.time;

  this.options.callbackEnd(this.currentPosition, this.gesture.direction, totalTime, velocity);

  this._onTouchcancel();
};

Draggable.prototype._onTouchcancel = function() {
  this.interaction = this.gesture = undefined;

  this.$target.removeClass("is-active");

  this._animationFrameQueue.clear();

  this._removeListeners();
};

Draggable.prototype._createInteraction = function(position) {
  var offsetDirection = this._prop("offsetDirection");
  var pointerOffset = position - this.$target.offset()[offsetDirection];
  var targetOffset = this.$target.offsetParent().offset()[offsetDirection];

  return {
    offset: targetOffset + pointerOffset,
    time: Date.now()
  };
};

Draggable.prototype._createGesture = function(position, direction) {
  return {
    direction: direction,
    position: position,
    time: Date.now()
  };
};

Draggable.prototype._getPosition = function(e) {
  return (e.touches ? e.touches[0] : e)[this._prop("pageAxis")];
};

Draggable.prototype._setPosition = function(position) {
  var value = this._prop("translateAxis").replace("*", position);

  this._animationFrameQueue.add(function() {
    this.$target.css("transform", value);
  }.bind(this));
};

Draggable.prototype._calcVelocity = function(start, end) {
  var percentage = 100 / window[this._prop("innerDimension")];
  var distance = percentage * (start.position - end.position);
  return Math.abs(distance / (end.time - start.time));
};

Draggable.prototype._calcRelativePosition = function(position) {
  return position - this.interaction.offset;
};

Draggable.prototype._prop = function(prop) {
  var props = {
    vertical: {
      pageAxis: "pageY",
      offsetDirection: "top",
      translateAxis: "translateY(*px)",
      innerDimension: "innerHeight",
      directions: ["up", "down"]
    },
    horizontal: {
      pageAxis: "pageX",
      offsetDirection: "left",
      translateAxis: "translateX(*px)",
      innerDimension: "innerWidth",
      directions: ["left", "right"]
    }
  };

  return props[this.options.axis][prop];
};
