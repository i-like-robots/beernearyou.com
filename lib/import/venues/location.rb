module Import
  module Venues

    class Location

      def initialize(auth)
        @client = Foursquare2::Client.new(client_id: auth[:id], client_secret: auth[:secret], api_version: 20140827)
      end

      def by_id(venue_id)
        @client.venue(venue_id)
      end

      def by_ids(venue_ids)
        venue_ids.map do |venue_id|
          by_id(venue_id)
        end
      end

    end

  end
end
