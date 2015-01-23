function ToggleExpanded($target, options) {
  var defaults = {
    animation: false
  };

  this.$target = $target;
  this.$toggle = $("[aria-controls='" + $target.attr("id") + "']");

  this.options = $.extend({}, defaults, options);
}

ToggleExpanded.prototype.init = function() {
  this.$toggle
    .attr("aria-expanded", false)
    .on("click", this._onClick.bind(this));
};

ToggleExpanded.prototype._onClick = function() {
  var expanded = this.$target.hasClass("is-open");

  if (this.options.animation) {
    this.$target
      .addClass("is-animating")
      .one(this.options.animation, this._onAnimationEnd.bind(this));
  }

  this.$target
    .addClass("is-" + (expanded ? "closed" : "open"))
    .removeClass("is-" + (expanded ? "open" : "closed"))
    .trigger("toggle:" + (expanded ? "close" : "open"));

  this.$toggle.attr("aria-expanded", !expanded);
};

ToggleExpanded.prototype._onAnimationEnd = function(e) {
  if (e.target != this.$target.get(0)) return;
  this.$target.removeClass("is-animating");
};
