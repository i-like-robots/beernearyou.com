namespace :import do

  namespace :venue do

    desc 'Import location data for all venues'
    task :locations => :environment do
      require "#{Rails.root}/lib/import/venue/location"

      import_venue_location = Import::Venue::Location.new(
        id: ENV['FOURSQUARE_CLIENT_ID'],
        secret: ENV['FOURSQUARE_CLIENT_SECRET']
      )

      import_venue_location.for_these(Venue.all)
    end

    desc 'Import stats for all venues'
    task :stats => :environment do
      require "#{Rails.root}/lib/import/venue/stats"

      import_venue_stats = Import::Venue::Stats.new(
        id: ENV['UNTAPPD_CLIENT_ID'],
        secret: ENV['UNTAPPD_CLIENT_SECRET']
      )

      import_venue_stats.for_these(Venue.all)
    end

  end

end
