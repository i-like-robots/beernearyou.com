/**
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

(function($) {

  $.throttle = function(delay, no_trailing, callback, debounce_mode) {
    var timeout_id;
    var last_exec = 0;

    if (typeof no_trailing !== 'boolean') {
      callback = no_trailing;
      debounce_mode = callback;
      no_trailing = undefined;
    }

    function wrapper() {
      var that = this;
      var elapsed = +new Date() - last_exec;
      var args = arguments;

      function exec() {
        last_exec = +new Date();
        callback.apply(that, args);
      };

      function clear() {
        timeout_id = undefined;
      };

      if (debounce_mode && !timeout_id) {
        exec();
      }

      timeout_id && clearTimeout(timeout_id);

      if (debounce_mode === undefined && elapsed > delay) {
        exec();
      } else if (no_trailing !== true) {
        timeout_id = setTimeout(debounce_mode ? clear : exec, debounce_mode === undefined ? delay - elapsed : delay);
      }
    };

    return wrapper;
  };

  $.debounce = function(delay, at_begin, callback) {
    return callback === undefined
      ? $.throttle(delay, at_begin, false)
      : $.throttle(delay, callback, at_begin !== false);
  };

})(window.jQuery);
