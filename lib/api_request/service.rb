require 'httparty'

module ApiRequest
  class Service

    def initialize(auth)
      @auth = auth
    end

    def fetch(url, query_params={}, cache_length=0)
      Rails.cache.fetch(url, expires_in: cache_length) do
        response = HTTParty.get("#{url}?#{to_query(query_params.merge(@auth))}")

        if response['meta']['code'] != 200
          raise StandardError "Couldn't fetch #{url}: #{response_data['meta']['errorDetail']}"
        end

        response['response']
      end
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
