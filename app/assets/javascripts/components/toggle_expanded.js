function ToggleExpanded($target, options) {
  var defaults = {
    animation: false,
    transition: false
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
  var shifting = this.options.animation || this.options.transition;

  if (shifting) {
    this.$target
      .one(shifting, this._onShiftEnd.bind(this))
      .addClass("is-" + (this.options.animation ? "animating" : "transitioning"));
  }

  this.$target
    .addClass("is-" + (expanded ? "closed" : "open"))
    .removeClass("is-" + (expanded ? "open" : "closed"))
    .trigger("toggle:" + (expanded ? "close" : "open"));

  this.$toggle.attr("aria-expanded", !expanded);
};

ToggleExpanded.prototype._onShiftEnd = function(e) {
  if (e.target != this.$target.get(0)) return;
  this.$target.removeClass("is-animating is-transitioning");
};
