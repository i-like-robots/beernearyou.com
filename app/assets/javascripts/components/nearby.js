function Nearby($target, options) {
  var defaults = {
    metric: false,
    timeout: 10000,
    frequency: 5000
  };

  this.$target = $target;
  this.$lat = $target.find("[name=lat]");
  this.$lng = $target.find("[name=lng]");
  this.$submit = $target.find("button[type=submit]");

  this.options = $.extend({}, defaults, options);
}

Nearby.prototype.init = function() {
  var positionOptions = {
    enableHighAccuracy: true,
    timeout: this.options.timeout
  };

  this.$submit.text("Requesting your location");
  this.$target.on("submit", $.proxy(this._onSubmit, this));

  this.watch = window.navigator.geolocation.watchPosition(
    $.proxy(this._onPosition, this),
    $.proxy(this._onError, this),
    positionOptions
  );

  return this;
};

Nearby.prototype._onSubmit = function() {
  return this.$lat.val() && this.$lng.val();
};

Nearby.prototype._onPosition = function(pos) {
  this.$lat.val(pos.coords.latitude.toFixed(6));
  this.$lng.val(pos.coords.longitude.toFixed(6));
  this.$submit.text("Find nearby venues").attr("disabled", false);
};

Nearby.prototype._onError = function(error) {
  window.console && window.console.log(error);
};
