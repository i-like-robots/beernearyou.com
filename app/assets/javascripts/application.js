//= require jquery2
//= require ./config
//= require ./support
//= require ./manifest
//= require_tree ./utils
//= require_tree ./components
//= require_tree ./views

window.support = new Support().init();

document.documentElement.classList.remove("no-js");

if (navigator.userAgent.match(/iP(hone|od)/i)) {
  document.documentElement.classList.add("iDevice");
}

window.addEventListener("DOMContentLoaded", function() {
  var views = [ document.documentElement.dataset.jsView, "global" ];

  views
    .filter(function(item, i) {
      return item && views.indexOf(item) == i;
    })
    .forEach(function(item) {
      window.app.view[item].call(window);
    });

}, false);
