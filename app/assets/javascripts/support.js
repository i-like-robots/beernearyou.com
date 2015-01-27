function Support(options) {
  var defaults = {
    addClassNames: true,
    supportPrefix: "has",
    noSupportPrefix: "no"
  };

  this.options = $.extend({}, defaults, options);
}

Support.prototype.init = function() {
  this.features = this._runFeatures();
  this.prefixes = this._runPrefixes();

  return this;
};

Support.prototype._runFeatures = function() {
  var test;
  var results = {};

  for (test in this.featureTests) {
    results[test] = this.featureTests[test]();

    if (this.options.addClassNames) {
      this._addClass(test, results[test]);
    }
  }

  return results;
};

Support.prototype._runPrefixes = function() {
  var test, prefixes, prefix;
  var el = document.createElement("div");
  var results = {};

  for (test in this.prefixTests) {
    prefixes = this.prefixTests[test]();

    for (prefix in prefixes) {
      if (el.style[prefix] !== undefined) {
        results[test] = prefixes[prefix];
        break;
      }
    }

    if (this.options.addClassNames) {
      this._addClass(test, results[test]);
    }
  }

  return results;
};

Support.prototype._addClass = function(test, supported) {
  var prefix = supported ? this.options.supportPrefix : this.options.noSupportPrefix;
  document.documentElement.className += " " + prefix + "-" + test;
};

Support.prototype.feature = function(feature) {
  return this.features[feature];
};

Support.prototype.prefix = function(feature) {
  return this.prefixes[feature];
};

Support.prototype.featureTests = {

  svg: function() {
    return "SVGAngle" in window;
  },

  touch: function() {
    return window.ontouchstart !== undefined;
  },

  geolocation: function() {
    return "geolocation" in window.navigator;
  },

  deviceOrientation: function() {
    return "DeviceOrientationEvent" in window && "orientation" in window;
  }

};

Support.prototype.prefixTests = {

  transitionEnd: function() {
    return {
      transition: "transitionend",
      MozTransition: "transitionend",
      WebkitTransition: "webkitTransitionEnd"
    };
  },

  animationEnd: function() {
    return {
      animation: "animationend",
      MozAnimation: "animationend",
      webkitAnimation: "webkitAnimationEnd"
    };
  }

};
