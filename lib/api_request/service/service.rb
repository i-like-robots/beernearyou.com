require 'httparty'

module ApiRequest
  class Service

    def initialize(auth)
      @auth = auth
    end

    def fetch(url, query_params, cache_length=0)
      # Rails.cache.fetch(url, expires_in: cache_length) do
        HTTParty.get("#{url}?#{query_params.merge(@auth).to_query}")
      # end
    end

  end
end
