module Import
  module Venue

    class Location

      def initialize(auth)
        @client = Foursquare2::Client.new(client_id: auth[:id], client_secret: auth[:secret], api_version: 20140827)
      end

      def by_id(venue_id)
        @client.venue(venue_id)
      end

      def for_these(venues)
        venues.each do |venue|
          foursquare_data = by_id(venue.foursquare_id)

          unless foursquare_data.nil?
            update_record(venue, foursquare_data.location)
          end
        end
      end

      private

      def update_record(venue, foursquare_location_hash)
        mapped_data = {
          latitude: foursquare_location_hash.lat,
          longitude: foursquare_location_hash.lng,
          street_address: foursquare_location_hash.address,
          city: foursquare_location_hash.city,
          postal_code: foursquare_location_hash.postalCode
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
