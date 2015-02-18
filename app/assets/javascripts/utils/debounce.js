function debounce(wait, callback, scope) {
  var timeout, context, args;

  return function() {
    clearTimeout(timeout);
    context = scope || this;
    args = arguments;
    timeout = setTimeout(function() {
      callback.apply(context, args);
      context = args = null;
    }, wait);
  };
}
