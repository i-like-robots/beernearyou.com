require 'api_request/service/service'

module ApiRequest
  class Foursquare < ApiRequest::Service

    BASE_URI = 'https://api.foursquare.com/v2'
    API_VERSION = 20140828
    CACHE_FOR = 72.hours

    def venue(venue_id)
      response_data = fetch("#{BASE_URI}/venues/#{venue_id}", default_params, CACHE_FOR)

      if response_data['meta']['code'] != 200
        raise StandardError "Couldn't fetch venue data: #{response_data['meta']['errorDetail']}"
      end

      response_data['response']['venue']
    end

    private

    def default_params
      { v: API_VERSION }
    end

  end
end
