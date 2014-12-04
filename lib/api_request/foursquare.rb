module ApiRequest
  class Foursquare < ApiRequest::Service

    BASE_URI = 'https://api.foursquare.com/v2'
    API_VERSION = 20140828
    CACHE_FOR = 72.hours

    def venue(venue_id, params={})
      response_data = fetch("#{BASE_URI}/venues/#{venue_id}", default_params.merge(params), CACHE_FOR)
      response_data['venue']
    end

    def venue_photos(venue_id, params={})
      response_data = fetch("#{BASE_URI}/venues/#{venue_id}/photos", default_params.merge(params), CACHE_FOR)
      response_data['photos']
    end

    private

    def default_params
      { v: API_VERSION }
    end

  end
end
