class VenueController < ApplicationController

  def index
    @venues = Venue.all
  end

  def show
    @venue = Venue.find_by(foursquare_id: params[:id]) or not_found
  end

end
