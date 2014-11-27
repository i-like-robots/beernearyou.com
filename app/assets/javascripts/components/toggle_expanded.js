function ToggleExpanded($target) {
  this.$target = $target;
  this.$toggle = $target.siblings("button[aria-controls='#" + $target.attr("id") + "']");
}

ToggleExpanded.prototype.init = function() {
  this.$target.addClass("is-closed");

  this.$toggle
    .attr("aria-expanded", false)
    .on("click", $.proxy(this._onClick, this));
};

ToggleExpanded.prototype._onClick = function() {
  this.$target.toggleClass("is-closed is-open");
  this.$toggle.attr("aria-expanded", this.$target.hasClass("is-open"));
};
