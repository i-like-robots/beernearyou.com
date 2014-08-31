class Venue < ActiveRecord::Base
  has_one :venue_location, dependent: :destroy
end
