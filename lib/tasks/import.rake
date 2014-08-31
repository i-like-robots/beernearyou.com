namespace :import do

  namespace :venue do

    desc 'Import location data for all venues'
    task :locations => :environment do
      require "#{Rails.root}/lib/import/venue/location"

      import_venue_location = Import::Venue::Location.new
      import_venue_location.for_these(Venue.all)
    end

  end

end
