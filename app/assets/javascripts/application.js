//= require jquery
//= require ./config
//= require ./support
//= require_tree ./utils
//= require_tree ./components
//= require_tree ./views

window.support = new Support().init();

$(document).ready(function() {
  var views = $("html").data("jsView").split(" ").concat("global");

  // Clean out any blank or repeat values
  views = $.grep(views, function(view, i) {
    return view && $.inArray(view, views) == i;
  });

  $.each(views, function(i, view) {
    window.app.view[view].call(window);
  });
});
