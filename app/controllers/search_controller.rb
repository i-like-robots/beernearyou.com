class SearchController < ApplicationController

  def index
  end

  def results
    @origin ||= create_origin_with_params(params)

    if @origin
      @venues = find_venues_with_origin(@origin)
    end
  end

  private

  def create_origin_with_params(params)
    if params[:lat] && params[:lng]
      [ params[:lat], params[:lng] ]
    elsif params[:postcode]
      Geocoder.coordinates(params[:postcode])
    end
  end

  def find_venues_with_origin(origin)
    Location.near(origin, 20)
      .joins(:venue)
      .select('venues.*')
      .reorder('distance ASC, venues.name')
  end

end
