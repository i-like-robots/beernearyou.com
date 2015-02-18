function Draggable($target, options) {
  var defaults = {
    handle: ".js-draggable",
    callbackStart: $.noop,
    callbackEnd: $.noop,
    horizontal: true,
    vertical: true,
    interval: 25
  };

  this.options = $.extend({}, defaults, options);

  this.$target = this.$handle = $target;

  if (!this.$handle.is(this.options.handle)) {
    this.$handle = this.$handle.find(this.options.handle);
  }

  this._touchcancelHandler = this._onTouchcancel.bind(this);
  this._touchstartHandler = this._onTouchstart.bind(this);
  this._touchmoveHandler = this._onTouchmove.bind(this);
  this._touchendHandler = this._onTouchend.bind(this);
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
  this.session = {
    offset: this._calculateOffset(e)
  };

  this._handleEventData(e);
  this._requestFrame(true);
  this._addListeners();

  this.options.callbackStart();

  e.preventDefault();
};

Draggable.prototype._onTouchmove = function(e) {
  this._handleEventData(e);
  this._requestFrame();
  e.preventDefault();
};

Draggable.prototype._onTouchend = function(e) {
  this._handleEventData(e);

  var lastInterval = this.session.interval;
  var firstTouch = this.session.first;
  var deltaTime = e.timeStamp - firstTouch.timeStamp;

  this.options.callbackEnd({
    direction: lastInterval.direction || null,
    velocity: lastInterval.velocity || [],
    position: lastInterval.position,
    time: deltaTime
  });

  this._onTouchcancel();
};

Draggable.prototype._onTouchcancel = function() {
  this.session = undefined;

  this._removeListeners();
  fastdom.clear(this._fastDomID);
  this.$target.removeClass("is-active");
};

Draggable.prototype._handleEventData = function(e) {
  var lastInterval = this.session.interval;

  var position = this._getPosition(e);

  var relative = [
    position[0] - this.session.offset[0],
    position[1] - this.session.offset[1]
  ];

  this.session.last = {
    timeStamp: e.timeStamp,
    position: position,
    relative: relative,
    type: e.type
  };

  if (!lastInterval) {
    this.session.interval = this.session.first = this.session.last;
  } else if (e.timeStamp - lastInterval.timeStamp > this.options.interval) {
    this.session.interval = this._handleIntervalData(this.session.last);
  }
};

Draggable.prototype._handleIntervalData = function(data) {
  data.direction = this._calculateDirection(this.session.interval, data);
  data.velocity = this._calculateVelocity(this.session.interval, data);

  return data;
};

Draggable.prototype._requestFrame = function(firstRun) {
  function callback() {
    firstRun && this.$target.addClass("is-active") && (firstRun = false);
    this.$target.css("transform", this._cssTranslate(this.session.last));
  }

  this._fastDomID = fastdom.write(callback, this);
};

Draggable.prototype._calculateOffset = function(e) {
  var position = this._getPosition(e);
  var targetOffset = this.$target.offset();
  var targetParentOffset = this.$target.offsetParent().offset();

  return [
    position[0] - targetOffset.left + targetParentOffset.left,
    position[1] - targetOffset.top + targetParentOffset.top
  ];
};

Draggable.prototype._calculateVelocity = function(previous, current) {
  var timeDelta = current.timeStamp - previous.timeStamp;
  var deltaX = previous.position[0] - current.position[0];
  var deltaY = previous.position[1] - current.position[1];
  var ratioX = (100 / window.innerWidth) * deltaX;
  var ratioY = (100 / window.innerHeight) * deltaY;

  return [
    Math.abs(ratioX / timeDelta),
    Math.abs(ratioY / timeDelta)
  ];
};

Draggable.prototype._calculateDirection = function(previous, current) {
  var deltaX = previous.position[0] - current.position[0];
  var deltaY = previous.position[1] - current.position[1];
  var x = y = "";

  Math.abs(deltaX) > 0 && (x = deltaX > 0 ? "left" : "right");
  Math.abs(deltaY) > 0 && (y = deltaY > 0 ? "up" : "down");

  if (!this.options.horizontal) return y;
  if (!this.options.vertical) return x;

  return deltaX > deltaY ? x : y;
};

Draggable.prototype._getPosition = function(e) {
  var pointer = e.changedTouches ? e.changedTouches[0] : e;

  return [
    pointer.pageX,
    pointer.pageY
  ];
};

Draggable.prototype._cssTranslate = function(touch) {
  var posX = this.options.horizontal ? touch.relative[0] : 0;
  var posY = this.options.vertical ? touch.relative[1] : 0;

  return "translate3d(" + posX + "px, " + posY + "px, 0)";
};
