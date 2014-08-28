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

    desc 'Import latest checkins for all venues'
    task :checkins => :environment do
      require "#{Rails.root}/lib/import/venue/checkins"

      import_venue_checkins = Import::Venue::Checkins.new(
        id: ENV['UNTAPPD_CLIENT_ID'],
        secret: ENV['UNTAPPD_CLIENT_SECRET']
      )

      import_venue_checkins.for_these(Venue.all)
    end

  end

end
