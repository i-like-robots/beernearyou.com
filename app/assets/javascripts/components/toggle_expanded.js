function ToggleExpanded($target) {
  this.$target = $target;
  this.$toggle = $("[aria-controls='" + $target.attr("id") + "']");
}

ToggleExpanded.prototype.init = function() {
  this.$toggle
    .attr("aria-expanded", false)
    .on("click", $.proxy(this._onClick, this));
};

ToggleExpanded.prototype._onClick = function() {
  var expanded = this.$target.hasClass("is-open");

  this.$target
    .addClass("is-" + (expanded ? "closed" : "open"))
    .removeClass("is-" + (expanded ? "open" : "closed"))
    .trigger("toggle:" + (expanded ? "close" : "open"));

  this.$toggle.attr("aria-expanded", !expanded);
};
