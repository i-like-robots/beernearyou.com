function Support() {
  this.options = {
    addClassNames: true,
    supportPrefix: "has",
    noSupportPrefix: "no"
  };

  this.results = {};
}

Support.prototype.init = function() {
  var test, result, prefix;

  for (test in this.tests) {
    result = this.results[test] = this.tests[test]();
    prefix = result ? this.options.supportPrefix : this.options.noSupportPrefix;

    if (this.options.addClassNames) {
      document.documentElement.className += " " + prefix + "-" + test + " ";
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

  deviceOrientation: function() {
    return "DeviceOrientationEvent" in window;
  },

  geolocation: function() {
    return "geolocation" in window.navigator;
  }

};

window.support = new Support().init();
