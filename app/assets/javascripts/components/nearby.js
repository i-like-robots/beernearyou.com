function Nearby($target) {
  this.$target = $target;
  this.$lat = $target.find("[name=lat]");
  this.$lng = $target.find("[name=lng]");
  this.$submit = $target.find("button[type=submit]");
}

Nearby.prototype.init = function() {
  this.$submit.text("Requesting your location");
  this.$target.on("submit", $.proxy(this._onSubmit, this));
  window.navigator.geolocation.getCurrentPosition($.proxy(this._onPosition, this));
};

Nearby.prototype._onSubmit = function() {
  return this.$lat.val() && this.$lng.val();
};

Nearby.prototype._onPosition = function(pos) {
  this.$lat.val(pos.coords.latitude.toFixed(6));
  this.$lng.val(pos.coords.longitude.toFixed(6));
  this.$submit.text("Find nearby venues").attr("disabled", false);
};
