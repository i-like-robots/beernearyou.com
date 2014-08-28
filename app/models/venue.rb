class Venue < ActiveRecord::Base
  has_one :venue_location, dependent: :destroy
  has_one :venue_stats, dependent: :destroy
end
