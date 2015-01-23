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
  this.$target.on("mousedown.drag touchstart.drag", this.options.dragTarget, this._onStart.bind(this));
  return this;
};

Draggable.prototype.teardown = function() {
  $(window).add(this.$target).off(".drag");
  this.reset();
};

Draggable.prototype.reset = function() {
  this.$target.css("transform", "").removeClass("is-active");
};

Draggable.prototype._onStart = function(e) {
  if (e.originalEvent.touches && e.originalEvent.touches.length > 1) return;

  var pointerPosition = this._getPosition(e);

  this._startInteraction(pointerPosition);
  this._startGesture(pointerPosition);

  this.$target
    .addClass("is-active")
    .css("transform", this._translate(this._calcRelativePosition(pointerPosition)));

  $(window)
    .on("mouseup.drag touchend.drag", this._onEnd.bind(this))
    .on("mousemove.drag touchmove.drag", this._onMove.bind(this));

  this.options.callbackStart(this.currentPosition);

  e.preventDefault();
};

Draggable.prototype._onMove = function(e) {
  var pointerPosition = this._getPosition(e);
  var direction = this._prop("directions")[+(pointerPosition > this.currentPosition)];

  if (direction != this.gesture.direction) {
    this._startGesture(pointerPosition, direction);
  }

  this.$target.css("transform", this._translate(this._calcRelativePosition(this.currentPosition = pointerPosition)));
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
  this.interaction = this.gesture = undefined;
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
  return (e.originalEvent.touches ? e.originalEvent.touches[0] : e)[this._prop("pageAxis")];
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
