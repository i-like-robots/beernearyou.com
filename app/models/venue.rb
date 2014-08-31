require 'api_request/service/foursquare'

class Venue < ActiveRecord::Base

  has_one :venue_location, dependent: :destroy

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
