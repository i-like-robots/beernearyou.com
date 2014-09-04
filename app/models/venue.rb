class Venue < ActiveRecord::Base

  has_one :location, dependent: :destroy
  accepts_nested_attributes_for :location

  def foursquare_data
    @fsq_data ||= self.class.foursquare_client.venue(self.foursquare_id)
  end

  private

  def self.foursquare_client
    @fsq_client ||= ApiRequest::Foursquare.new(
      client_id: ENV['FOURSQUARE_CLIENT_ID'],
      client_secret: ENV['FOURSQUARE_CLIENT_SECRET']
    )
  end

end
