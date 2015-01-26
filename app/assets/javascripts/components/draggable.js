function Draggable($target, options) {
  var defaults = {
    callbackStart: $.noop,
    callbackEnd: $.noop,
    axis: "horizontal"
  };

  this.$target = $target;
  this.draggable = $target.find(".js-draggable").get(0);

  this.options = $.extend({}, defaults, options);
}

Draggable.prototype.init = function() {
  // Native event API is ~50% faster than .on()/.off()
  this._touchcancelHandler = this._onTouchcancel.bind(this);
  this._touchstartHandler = this._onTouchstart.bind(this);
  this._touchmoveHandler = this._onTouchmove.bind(this);
  this._touchendHandler = this._onTouchend.bind(this);

  this.draggable.addEventListener("touchstart", this._touchstartHandler);

  return this;
};

Draggable.prototype.teardown = function() {
  this.draggable.removeEventListener("touchstart", this._touchstartHandler);
  this.$target.hasClass("is-active") && this._onTouchcancel();
  this.reset();
};

Draggable.prototype.reset = function() {
  this.$target.css("transform", "").removeClass("is-active");
};

Draggable.prototype._onTouchstart = function(e) {
  if (e.touches && e.touches.length > 1) return;

  var pointerPosition = this._getPosition(e);

  this._startInteraction(pointerPosition);
  this._startGesture(pointerPosition);

  this.$target
    .addClass("is-active")
    .css("transform", this._translate(this._calcRelativePosition(pointerPosition)));

  window.addEventListener("touchcancel", this._touchcancelHandler);
  window.addEventListener("touchmove", this._touchmoveHandler);
  window.addEventListener("touchend", this._touchendHandler);

  this.options.callbackStart();

  e.preventDefault();
};

Draggable.prototype._onTouchmove = function(e) {
  var pointerPosition = this._getPosition(e);
  var direction = this._prop("directions")[+(pointerPosition > this.currentPosition)];

  if (direction != this.gesture.direction) {
    this._startGesture(pointerPosition, direction);
  }

  this.$target.css("transform", this._translate(
    this._calcRelativePosition(this.currentPosition = pointerPosition)
  ));
};

Draggable.prototype._onTouchend = function() {
  var now = Date.now();
  var velocity = this._calcVelocity(this.gesture, {
    position: this.currentPosition,
    time: now
  });

  this.options.callbackEnd(this.currentPosition, this.gesture.direction, now - this.interaction.time, velocity);

  this._onTouchcancel();
};

Draggable.prototype._onTouchcancel = function() {
  window.removeEventListener("touchmove", this._touchmoveHandler);
  window.removeEventListener("touchend", this._touchendHandler);

  this.interaction = this.gesture = undefined;
  this.$target.removeClass("is-active");
};

Draggable.prototype._startInteraction = function(position) {
  var targetOffset = this.$target.offsetParent().offset()[this._prop("offsetDirection")];
  var pointerOffset = position - this.$target.offset()[this._prop("offsetDirection")];

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
  return (e.touches ? e.touches[0] : e)[this._prop("pageAxis")];
};

Draggable.prototype._calcVelocity = function(startGesture, endGesture) {
  var percentage = 100 / window[this._prop("innerDimension")];
  var distance = percentage * (startGesture.position - endGesture.position);
  var time = endGesture.time - startGesture.time;
  return Math.abs(distance / time);
};

Draggable.prototype._calcRelativePosition = function(position) {
  return position - this.interaction.offset;
};

Draggable.prototype._translate = function(value) {
  return this._prop("translateAxis").replace("*", value);
};

Draggable.prototype._prop = function(prop, axis) {
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

  return props[axis || this.options.axis][prop];
};
