class Venue < ActiveRecord::Base

  validates :name, presence: true
  validates :foursquare_id, presence: true

  before_create :add_location

  reverse_geocoded_by :lat, :lng, address: :full_address

  def full_address
    [ street_address, city, postal_code ].join(', ')
  end

  def coordinates
    [ lat, lng ].join(', ')
  end

  def foursquare_data
    @fsq_data ||= self.class.foursquare_client.venue(self.foursquare_id)
  end

  def add_location
    location = foursquare_data['location']

    self.lat = location['lat']
    self.lng = location['lng']
    self.street_address = location['address']
    self.city = location['city']
    self.postal_code = location['postalCode']
  end

  private

  def self.foursquare_client
    @fsq_client ||= ApiRequest::Foursquare.new(
      client_id: ENV['FOURSQUARE_CLIENT_ID'],
      client_secret: ENV['FOURSQUARE_CLIENT_SECRET']
    )
  end

end
