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
    .on("toggle:open", $.proxy(this._onOpen, this))
    .on("toggle:close", $.proxy(this._onClose, this));
};

Lightbox.prototype._onOpen = function() {
  this.trigger = document.activeElement;

  // Firefox doesn't support focusin or focusout
  // https://bugzilla.mozilla.org/show_bug.cgi?id=687787
  $(window)
    .on("keyup.lightbox", $.proxy(this._onKeyup, this))
    .on("focusout.lightbox", $.proxy(this._onFocusout, this));

  this.$target.focus();
};

Lightbox.prototype._onClose = function() {
  $(window).off(".lightbox");
  this.trigger.focus();
};

Lightbox.prototype._onKeyup = function(e) {
  if (e.keyCode == 27) {
    this.$target.find("[aria-controls='" + this.$target.attr("id") + "']").click();
  }
};

Lightbox.prototype._onFocusout = function(e) {
  if (e.relatedTarget && !this.$target.get(0).contains(e.relatedTarget)) {
    this.$target.focus();
  }
};
