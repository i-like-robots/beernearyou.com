function Lightbox($target, options) {
  var defaults = {};

  this.$target = $target;
  this.options = $.extend({}, defaults, options);
}

Lightbox.prototype.init = function() {
  this.$target
    .attr({
      tabindex: 0,
      role: "dialog"
    })
    .on("toggle:open", this._onOpen.bind(this))
    .on("toggle:close", this._onClose.bind(this));
};

Lightbox.prototype._onOpen = function() {
  this.trigger = document.activeElement;

  // Firefox doesn't support focusin or focusout
  // https://bugzilla.mozilla.org/show_bug.cgi?id=687787
  $(window)
    .on("keyup.lightbox", this._onKeyup.bind(this))
    .on("focusout.lightbox", this._onFocusout.bind(this));

  // Prevent the document scrolling
  $("html, body").css("overflow", "hidden");

  this.$target.focus();
};

Lightbox.prototype._onClose = function() {
  $("html, body").css("overflow", "");
  $(window).off(".lightbox");
  this.trigger.focus();
};

Lightbox.prototype._onKeyup = function(e) {
  if (e.keyCode == 27) {
    this.$target.find("[aria-controls='" + this.$target.attr("id") + "']").eq(0).click();
  }
};

Lightbox.prototype._onFocusout = function(e) {
  if (e.relatedTarget && !this.$target.get(0).contains(e.relatedTarget)) {
    this.$target.focus();
  }
};
