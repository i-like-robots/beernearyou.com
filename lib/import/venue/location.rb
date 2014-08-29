require 'api_request/service/foursquare'

module Import
  module Venue

    class Location

      def initialize(auth)
        @client = ApiRequest::Foursquare.new({ client_id: auth[:id], client_secret: auth[:secret] })
      end

      def by_id(venue_id)
        @client.venue(venue_id)
      end

      def for_these(venues)
        venues.each do |venue|
          foursquare_data = by_id(venue.foursquare_id)
          update_record(venue, foursquare_data['location'])
        end
      end

      private

      def update_record(venue, location_hash)
        mapped_data = {
          latitude: location_hash['lat'],
          longitude: location_hash['lng'],
          street_address: location_hash['address'],
          city: location_hash['city'],
          postal_code: location_hash['postalCode']
        }

        if venue.venue_location.nil?
          venue.create_venue_location(mapped_data)
        else
          venue.venue_location.update_attributes(mapped_data)
        end
      end

    end

  end
end
