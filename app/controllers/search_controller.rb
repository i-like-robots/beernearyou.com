class SearchController < ApplicationController

  before_filter :sanitize_params

  def index
  end

  def results
    @origin = create_origin_with_params(params)
    @live = true unless params[:postcode]
    @search_term = (params[:postcode] || @origin).to_s

    if @origin && is_origin_within_locale(@origin, APP_CONFIG['locale_center'], APP_CONFIG['locale_distance'])
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

  def is_origin_within_locale(origin, locale, max_distance)
    actual_distance = Geocoder::Calculations.distance_between(origin, locale)
    @within_bounds = actual_distance <= max_distance
  end

  def find_venues_with_origin(origin)
    Venue.near(origin, 20).reorder('distance ASC, name DESC')
  end

  def sanitize_params
    params[:lat] = params[:lat].try(:to_f) || nil
    params[:lng] = params[:lng].try(:to_f) || nil
  end

end
