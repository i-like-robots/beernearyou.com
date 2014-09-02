Geocoder.configure(

  # geocoding options
  :timeout      => 5,           # geocoding service timeout (secs)
  :lookup       => :nominatim,  # name of geocoding service (symbol)
  :language     => :en,         # ISO-639 language code

  # calculation options
  :units     => :mi,       # :km for kilometers or :mi for miles
  :distances => :linear    # :spherical or :linear

)
