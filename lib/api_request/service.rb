require 'httparty'

module ApiRequest
  class Service

    def initialize(auth)
      @auth = auth
    end

    def fetch(url, query_params, cache_length=0)
      # Rails.cache.fetch(url, expires_in: cache_length) do
        HTTParty.get("#{url}?#{to_query(query_params.merge(@auth))}")
      # end
    end

    private

    def to_query(params)
      query_string = []

      params.each do |key, value|
        query_string.push "#{key}=#{value}"
      end

      query_string.join('&')
    end

  end
end
