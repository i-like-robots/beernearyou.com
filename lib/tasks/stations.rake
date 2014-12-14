namespace :stations do

  desc "Import station locations data"
  task import: :environment do
    require 'csv'

    CSV.foreach('./app/data/station_locations.csv', headers: true) do |row|
      station = row.to_hash
      Station.create(
        name: station['name'],
        zone: station['zone'],
        lat: station['latitude'],
        lng: station['longitude']
      )
    end
  end

end
