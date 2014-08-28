module Import
  module Venue

    class Checkins

      def initialize(auth)
        Untappd.configure do |config|
          config.client_id = auth[:id]
          config.client_secret = auth[:secret]
        end
      end

      def by_id(venue_id, max_results=10)
        Untappd::Venue.feed(venue_id, limit: max_results)
      end

      def for_these(venues)
        venues.each do |venue|
          data = by_id(venue.untappd_id)

          if data
            update_record(venue, data)
          end

          data
        end
      end

      private

      def update_record(venue, data)
        # VenueCheckins.find_or_create_by(venue_id: venue.id) do |venue_location|
        #   latitude = data.location.lat,
        #   longitude = data.location.lng,
        #   street_address = data.location.address
        #   city = data.location.city
        #   postal_code = data.location.postalCode
        # end
      end

  end
end
