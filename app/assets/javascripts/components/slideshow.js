function Slideshow($target, options) {
  var defaults = {
    nextText: 'Next',
    prevText: 'Prev'
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
    .on("keyup", $.proxy(this._keypress, this));

  this.to(0);

  return this;
};

Slideshow.prototype.to = function(x) {
  var current = this._loop(x);
  var prev = this._loop(current - 1);
  var next = this._loop(current + 1);

  this.$frames.removeClass("is-next is-prev is-current");

  this._preload(this.$frames.eq(current).addClass("is-current"));
  this._preload(this.$frames.eq(prev).addClass("is-prev"));
  this._preload(this.$frames.eq(next).addClass("is-next"));

  this.$progress.children().removeClass("is-current").eq(current).addClass("is-current");
};

Slideshow.prototype.prev = function() {
  this.to(this._current() - 1);
};

Slideshow.prototype.next = function() {
  this.to(this._current() + 1);
};

Slideshow.prototype._keypress = function(e) {
  switch (e.keyCode) {
    case 37:
      this.prev();
      break;
    case 39:
      this.next();
      break;
  }
};

Slideshow.prototype._current = function() {
  return this.$frames.filter(".is-current").index();
};

Slideshow.prototype._loop = function(x) {
  var maximum = this.$frames.length - 1;
  return x > maximum ? 0 : (x < 0 ? maximum : x);
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
