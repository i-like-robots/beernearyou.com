function Slideshow($target) {
  this.$target = $target;
  this.$runner = this.$target.children();
  this.$frames = this.$runner.children();
}

Slideshow.prototype.init = function() {
  this.$btnNext = $("<button class='Slideshow-btn Slideshow-btn--next'>Next slide</button>");
  this.$btnPrev = $("<button class='Slideshow-btn Slideshow-btn--prev'>Prev slide</button>");

  this.$btnNext.on("click", $.proxy(this.next, this)).appendTo(this.$target);
  this.$btnPrev.on("click", $.proxy(this.prev, this)).appendTo(this.$target);

  this.$target.on("keyup", $.proxy(this._keypress, this));

  this.to(0);

  return this;
};

Slideshow.prototype.to = function(x) {
  var next = this._loop(x + 1);
  var prev = this._loop(x - 1);
  var current = this._loop(x);

  this.$frames.removeClass("is-next is-prev is-current");

  this.$frames.eq(next).addClass("is-next");
  this.$frames.eq(prev).addClass("is-prev");
  this.$frames.eq(current).addClass("is-current");
};

Slideshow.prototype.next = function() {
  this.to(this._current() + 1);
};

Slideshow.prototype.prev = function() {
  this.to(this._current() - 1);
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
