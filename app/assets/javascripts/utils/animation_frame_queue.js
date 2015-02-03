/*

  # Animation Frame Queue

  A utility to ensure all queued requestAnimationFrame callbacks
  are cancelled to prevent nasty surprises.


  ## The problem:

  var animationFrameID;

  window.addEventListener("touchmove", function(e) {
    // this variable may be reassigned before the previous callback has been triggered
    animationFrameID = window.requestAnimationFrame(callback)
  });

  window.addEventListener("touchend", function(e) {
    // this only cancels the last assigned ID, there could be more callbacks to come
    window.cancelAnimationFrame(animationFrameID);
  });


  ## Usage:

  var animationFrameQueue = new AnimationFrameQueue;

  // Add a callback to trigger on the next animation frame
  animationFrameQueue.add(function() {
    ...
  });

  // Clear all callbacks in the current queue
  animationFrameQueue.clear();

*/

function AnimationFrameQueue() {
  this.queue = [];
  this.supported = "requestAnimationFrame" in window;
}

AnimationFrameQueue.prototype.add = function(callback) {
  if (!this.supported) return callback();

  this.queue.push(
    window.requestAnimationFrame(function() {
      this.queue.shift();
      callback();
    }.bind(this))
  );
};

AnimationFrameQueue.prototype.clear = function() {
  if (!this.supported) return;

  for (var i = 0, len = this.queue.length; i < len; i++) {
    window.cancelAnimationFrame(this.queue[i]);
  }
};
