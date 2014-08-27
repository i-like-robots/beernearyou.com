module Import
  module Venues

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

      def by_ids(venue_ids)
        venue_ids.map do |venue_id|
          by_id(venue_id)
        end
      end

    end

  end
end
