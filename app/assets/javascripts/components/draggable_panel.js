function DraggablePanel($target) {
  this.$target = $target;
}

DraggablePanel.prototype.init = function() {
  this.$target.addClass("is-draggable is-closed");

  this.draggable = new Draggable(this.$target, {
    callbackStart: this._onStart.bind(this),
    callbackEnd: this._onEnd.bind(this),
    horizontal: false
  });

  this.draggable.init();

  return this;
};

DraggablePanel.prototype.teardown = function() {
  this.draggable.teardown();
  this.$target.removeClass("is-draggable is-closed is-open");
};

DraggablePanel.prototype._onStart = function() {
  this.$target.removeClass("is-open is-closed").trigger("panel:dragstart");
};

DraggablePanel.prototype._onEnd = function(e) {
  if (e.time < 150) {
    this.isOpen = !this.isOpen;
  } else if (e.velocity[1] > 0.05) {
    this.isOpen = e.direction == "up";
  } else {
    this.isOpen = e.position[1] < (window.innerHeight / 2);
  }

  this.$target.addClass("is-" + (this.isOpen ? "open" : "closed")).trigger("panel:dragend");

  this.draggable.reset();
};
