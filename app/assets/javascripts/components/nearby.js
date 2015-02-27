function Nearby($target) {
  this.$target = $target;
  this.$lat = $target.find("[name=lat]");
  this.$lng = $target.find("[name=lng]");
  this.$submit = $target.find("button[type=submit]");
}

Nearby.prototype.init = function() {
  this.$target.one("submit", this._onSubmit.bind(this));
  return this;
};

Nearby.prototype._onSubmit = function(e) {
  e.preventDefault();

  this.$submit.text("Finding location…").prop("disabled", true);

  window.navigator.geolocation.watchPosition(
    this._onPosition.bind(this),
    this._onError.bind(this),
    window.app.geolocation
  );
};

Nearby.prototype._onPosition = function(pos) {
  this.$lat.val(pos.coords.latitude.toFixed(6));
  this.$lng.val(pos.coords.longitude.toFixed(6));
  this.$target.submit();
};

Nearby.prototype._onError = function(error) {
  window.console && window.console.log(error);
};
