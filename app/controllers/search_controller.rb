class SearchController < ApplicationController

  def index
  end

  def nearby
    if params[:lat] && params[:lng]
      origin = [ params[:lat], params[:lng] ]
    elsif params[:postcode]
      origin = Geocoder.coordinates(params[:postcode])
    end

    if origin
      @venues = nearby_with_origin(origin)
    end
  end

  private

  def nearby_with_origin(origin)
    Location.near(origin, 20)
      .joins(:venue)
      .select('venues.*')
      .reorder('distance ASC, venues.name')
  end

end
