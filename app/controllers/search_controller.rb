class SearchController < ApplicationController

  def index
  end

  def results
    if params[:lat] && params[:lng]
      origin = [ params[:lat], params[:lng] ]
    elsif params[:postcode]
      origin = Geocoder.coordinates(params[:postcode])
    end

    if origin
      @venues = find_venues_with_origin(origin)
    end
  end

  private

  def find_venues_with_origin(origin)
    Location.near(origin, 20)
      .joins(:venue)
      .select('venues.*')
      .reorder('distance ASC, venues.name')
  end

end
