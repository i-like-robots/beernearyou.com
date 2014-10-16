//= require jquery
//= require ./config
//= require ./support
//= require_tree ./components
//= require_tree ./views

$(document).ready(function() {
  var views = $("html").data("jsView").split(" ");

  // Clean out any blank values
  views = $.grep(views, function(view) {
    return view && view.length;
  });

  if (views.length) {
    $.each(views, function(i, view) {
      window.app.view[view].call(window);
    });
  }
});
