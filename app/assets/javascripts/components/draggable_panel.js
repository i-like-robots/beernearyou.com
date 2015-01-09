function DraggablePanel($target) {
  this.$target = $target;
}

DraggablePanel.prototype.init = function() {
  this.$target.addClass("is-draggable is-closed");

  this.draggable = new Draggable(this.$target, {
    callbackStart: $.proxy(this._onStart, this),
    callbackEnd: $.proxy(this._onEnd, this),
    axis: "vertical"
  });

  this.draggable.init();

  return this;
};

DraggablePanel.prototype.teardown = function() {
  this.draggable.teardown();
  this.$target.removeClass("is-draggable is-closed is-open");
};

DraggablePanel.prototype._onStart = function() {
  this.$target.removeClass("is-open is-closed");
};

DraggablePanel.prototype._onEnd = function(position, direction, time, velocity) {
  if (time < 100) {
    this.isOpen = !this.isOpen;
  } else if (velocity > 0.05) {
    this.isOpen = direction == "up";
  } else {
    this.isOpen = position < (window.innerHeight / 2);
  }

  this.$target.addClass("is-" + (this.isOpen ? "open" : "closed"));

  this.draggable.reset();
};
