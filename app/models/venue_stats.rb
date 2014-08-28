class VenueStats < ActiveRecord::Base
  belongs_to :venue
  serialize :top_beers
end
