class SearchController < ApplicationController

  def index
  end

  def nearby
    @venues = Location.near([params[:lat], params[:lng]])
      .joins(:venue)
      .select('venues.*')
      .reorder('distance ASC, venues.name')
  end

end
