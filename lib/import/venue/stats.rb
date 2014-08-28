module Import
  module Venue

    class Stats

      def initialize(auth)
        Untappd.configure do |config|
          config.client_id = auth[:id]
          config.client_secret = auth[:secret]
        end
      end

      def by_id(venue_id)
        Untappd::Venue.feed(venue_id, limit: max_results)
      end

      def for_these(venues)
        venues.each do |venue|
          untappd_data = by_id(venue.untappd_id)

          unless untappd_data.nil?
            update_record(venue, untappd_data.location)
          end
        end
      end

      private

      def update_record(venue, untappd_venue_hash)
        mapped_data = {
          checkin_total: untappd_venue_hash.stats.total_count,
          top_beers: untappd_venue_hash.top_beers.items
        }

        if venue.venue_stats.nil?
          venue.create_venue_stats(mapped_data)
        else
          venue.venue_stats.update_attributes(mapped_data)
        end
      end

  end
end
