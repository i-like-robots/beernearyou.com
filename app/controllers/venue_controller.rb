class VenueController < ApplicationController

  def index
    @venues = Venue.all
  end

  def show
    @venue = Venue.find_by(foursquare_id: params[:id]) or not_found
    @nearest_station = Station.near(@venue.coordinates).limit(1).first
  end

end
