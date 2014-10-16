function Support($target, options) {
  var defaults = {
    addClassNames: true,
    supportPrefix: "has",
    noSupportPrefix: "no"
  };

  this.$target = $target;
  this.options = $.extend({}, defaults, options);
}

Support.prototype.init = function() {
  var test, result, prefix;

  this.results = {};

  for (test in this.tests) {
    result = this.results[test] = this.tests[test].call(window);
    prefix = result ? this.options.supportPrefix : this.options.noSupportPrefix;

    if (this.options.addClassNames) {
      this.$target.addClass(prefix + "-" + test);
    }
  }

  return this;
};

Support.prototype.check = function(feature) {
  return this.results[feature];
};

Support.prototype.tests = {

  svg: function() {
    return "SVGAngle" in this;
  },

  deviceOrientation: function() {
    return "DeviceOrientationEvent" in this;
  },

  geolocation: function() {
    return "geolocation" in this.navigator;
  }

};
