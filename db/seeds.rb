# ruby encoding: utf-8

venues = [
  [ 'BrewDog Camden', '4edce907c2ee3cd644c79c65', 137251 ],
  [ 'BrewDog Shepherds Bush', '529655db11d20a5e5ce7251e', 1192406 ],
  [ 'BrewDog Shoreditch', '507dde91e412203dde77efb6', 438006 ],
  [ 'CASK', '4b09a2a4f964a520ba1a23e3', 28148 ],
  [ 'Craft Beer Co. Brixton', '50649c18e4b09dcdf8cc26a3', 412562 ],
  [ 'Craft Beer Co. Islington', '5045e44229a683960498d226', 471291 ],
  [ 'Craft Beer Co. Holborn', '536cd46e11d29fe6210957cf', 1608850 ],
  [ 'Earl of Essex', '4ad84bb7f964a520f81021e3', 310161 ],
  [ 'Euston Tap', '4cd450ca67adf04da9952691', 5801 ],
  [ 'Holborn Whippet', '4fb67af3e4b014d752c9b6c7', 259670 ]
]

venues.each do |name, foursquare_id, untappd_id|
  Venue.create({ name: name, foursquare_id: foursquare_id, untappd_id: untappd_id })
end
