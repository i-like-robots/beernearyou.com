function Support(options) {
  var defaults = {
    addClassNames: true,
    supportPrefix: "has",
    noSupportPrefix: "no"
  };

  this.options = $.extend({}, defaults, options);
}

Support.prototype.init = function() {
  var test, result, prefix;

  this.results = {};

  for (test in this.tests) {
    result = this.results[test] = this.tests[test]();
    prefix = result ? this.options.supportPrefix : this.options.noSupportPrefix;

    if (this.options.addClassNames) {
      document.documentElement.className += " " + prefix + "-" + test;
    }
  }

  return this;
};

Support.prototype.check = function(feature) {
  return this.results[feature];
};

Support.prototype.tests = {

  svg: function() {
    return "SVGAngle" in window;
  },

  geolocation: function() {
    return "geolocation" in window.navigator;
  },

  deviceOrientation: function() {
    return "DeviceOrientationEvent" in window && "orientation" in window;
  }

};
