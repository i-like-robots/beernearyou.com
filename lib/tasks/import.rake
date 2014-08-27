namespace :import do

  namespace :venues do

    desc 'Import location data for all venues'
    task :locations => :environment do
      require "#{Rails.root}/lib/import/venues/location"

      venue_locations = Import::Venues::Location.new(
        id: ENV['FOURSQUARE_CLIENT_ID'],
        secret: ENV['FOURSQUARE_CLIENT_SECRET']
      )

      puts venue_locations.by_ids([
        '4edce907c2ee3cd644c79c65',
        '4ad84bb7f964a520f81021e3',
        '4fb67af3e4b014d752c9b6c7'
      ])
    end

    desc 'Import latest checkins for all venues'
    task :checkins => :environment do
      require "#{Rails.root}/lib/import/venues/checkins"

      venue_checkins = Import::Venues::Checkins.new(
        id: ENV['UNTAPPD_CLIENT_ID'],
        secret: ENV['UNTAPPD_CLIENT_SECRET']
      )

      puts venue_checkins.by_ids([
        137251,
        310161,
        259670
      ])
    end

  end

end
