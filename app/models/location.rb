class Location < ActiveRecord::Base

  belongs_to :venue

  def full_address
    [ street_address, city, postal_code ].join(', ')
  end

  def coordinates
    [ latitude, city, longitude ].join(', ')
  end

  reverse_geocoded_by :latitude, :longitude, address: :full_address

end
