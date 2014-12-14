class Station < ActiveRecord::Base
  reverse_geocoded_by :lat, :lng
end
