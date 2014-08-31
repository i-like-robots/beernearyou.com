require 'api_request/service/foursquare'

module Import
  module Venue

    class Location

      def for_these(venues)
        venues.each do |venue|
          update_record(venue)
        end
      end

      private

      def update_record(venue)
        location_hash = venue.foursquare_data['location']

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
