namespace :import do
  namespace :venues do

    desc 'Import venue meta data for all venues'
    task :all => :environment do
      require "#{Rails.root}/lib/import/venues"

      import_venues = Import::Venues.new(
        id: ENV['FOURSQUARE_CLIENT_ID'],
        secret: ENV['FOURSQUARE_CLIENT_SECRET'],
        version: ENV['FOURSQUARE_API_VERSION']
      )

      puts import_venues.by_ids([
        '4edce907c2ee3cd644c79c65',
        '4ad84bb7f964a520f81021e3',
        '4fb67af3e4b014d752c9b6c7'
      ])
    end

  end
end
