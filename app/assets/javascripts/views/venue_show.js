window.app.view.venueShow = function() {

  // Venue location map
  var $map = $("#map");

  if ($map.length) {
    var origin = [ $map.data("lat"), $map.data("lng") ];

    var options = {
      mapOptions: {
        scrollWheelZoom: false
      },
      mapboxURL: window.app.config.MAPBOX_URL,
      projectID: window.app.config.MAPBOX_PROJECT,
      accessToken: window.app.config.MAPBOX_TOKEN
    };

    var mapbox = new Mapbox($map, options).init();

    $map.one("mapbox:load", function() {
      var origin = [$map.data("lat"), $map.data("lng")];

      var marker = mapbox.createMarker(origin, {
        "marker-symbol": "beer",
        "marker-color": "#3CA0D3"
      });

      marker.addTo(mapbox.map.setView(origin, 16));
    });
  }

  // Setup gallery with a slideshow in a lightbox
  var $lightbox = $("#lightbox");
  var $slideshow = $("#slideshow");

  if ($lightbox.length && $slideshow.length) {
    var trigger;

    new ToggleExpanded($lightbox).init();

    $lightbox
      .one("toggle:open", function() {
        var options = {
          prevText: "<span class='Icon Icon--white Icon--left'><span class='u-hidden'>Previous</span></span>",
          nextText: "<span class='Icon Icon--white Icon--right'><span class='u-hidden'>Next</span></span>"
        };

        new Slideshow($slideshow, options).init();
      })
      .on("toggle:open", function() {
        trigger = document.activeElement;

        $slideshow.focus();

        $(window).on("keyup.lightbox", function(e) {
          if (e.keyCode == 27) {
            $lightbox.find("[aria-controls='lightbox']").click();
          }
        });
      })
      .on("toggle:close", function() {
        $(window).off(".lightbox");
        trigger.focus();
      });
  }

};
