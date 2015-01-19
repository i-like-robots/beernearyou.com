function Slideshow($target, options) {
  var defaults = {
    touch: false,
    nextText: "Next",
    prevText: "Prev",
    transition: false
  };

  this.$target = $target;
  this.$frames = this.$target.children();
  this.options = $.extend({}, defaults, options);
}

Slideshow.prototype.init = function() {
  var i, len;

  this.$btnPrev = $("<button class='Slideshow-btn Slideshow-btn--prev'>" + this.options.prevText + "</button>");
  this.$btnNext = $("<button class='Slideshow-btn Slideshow-btn--next'>" + this.options.nextText + "</button>");

  this.$btnPrev.on("click", $.proxy(this.prev, this)).appendTo(this.$target);
  this.$btnNext.on("click", $.proxy(this.next, this)).appendTo(this.$target);

  this.$progress = $("<ul class='Slideshow-progress' />");

  for (i = 0, len = this.$frames.length; i < len; i++) {
    this.$progress.append("<li class='Slideshow-progressStep' />");
  }

  this.$target
    .attr("tabindex", 0)
    .append(this.$progress)
    .on("keyup", $.proxy(this._onKeyup, this));

  this.to(0, true);

  return this;
};

Slideshow.prototype.to = function(x, firstRun) {
  var current = this._loop(x);
  var prev = this._loop(current - 1);
  var next = this._loop(current + 1);

  !firstRun && this.$frames.removeClass("is-next is-prev is-current") && this._lock();

  this._preload(this.$frames.eq(current).addClass("is-current"));
  this._preload(this.$frames.eq(prev).addClass("is-prev"));
  this._preload(this.$frames.eq(next).addClass("is-next"));

  this.$progress.children().removeClass("is-current").eq(current).addClass("is-current");

  if (!firstRun && this.options.transition) {
    this.$target
      .addClass("is-transitioning")
      .on(this.options.transition, $.proxy(this._onTransitionend, this));
  } else {
    this._unlock();
  }
};

Slideshow.prototype.prev = function() {
  this.to(this.current() - 1);
};

Slideshow.prototype.next = function() {
  this.to(this.current() + 1);
};

Slideshow.prototype.current = function() {
  return this.$frames.filter(".is-current").index();
};

Slideshow.prototype._onKeyup = function(e) {
  switch (e.keyCode) {
    case 37:
      this.prev();
      break;
    case 39:
      this.next();
      break;
  }
};

Slideshow.prototype._onTouchend = function(position, direction, time, velocity) {
  var action = direction == "left" ? "next" : "prev";
  var quadrant = (100 / this.$target.width()) * position;

  if (velocity > 0.05 || (direction == "left" && quadrant < 25) || (direction == "right" && quadrant > 75)) {
    this[action]();
  } else {
    this._draggable.reset();
  }
};

Slideshow.prototype._onTransitionend = function(e) {
  this.$frames.is(e.target) && this.$target.removeClass("is-transitioning").off(this.options.transition);
  this._unlock();
};

Slideshow.prototype._loop = function(x) {
  var maximum = this.$frames.length - 1;
  return x > maximum ? 0 : (x < 0 ? maximum : x);
};

Slideshow.prototype._initDraggable = function($frame) {
  var options = { callbackEnd: $.proxy(this._onTouchend, this) };
  this._draggable = new Draggable($frame, options).init();
};

Slideshow.prototype._preload = function($frame) {
  var $img = $frame.prop("loaded", true).find("img");

  if ($img.hasClass("is-loaded")) return;

  $img
    .attr("src", $img.attr("data-src"))
    .attr("alt", $img.attr("data-alt"))
    .removeAttr("data-src data-alt")
    .addClass("is-loaded");
};

Slideshow.prototype._lock = function() {
  this.$btnPrev.add(this.$btnNext).prop("disabled", true);
  this._draggable && this._draggable.teardown();
};

Slideshow.prototype._unlock = function() {
  this.$btnPrev.add(this.$btnNext).prop("disabled", false);
  this.options.touch && this._initDraggable(this.$frames.eq(this.current()));
};
