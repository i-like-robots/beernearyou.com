require 'rails_helper'

RSpec.describe ApiRequest::Foursquare do

  let(:auth)      { { id: 'user_id', token: 'user_token' } }
  let(:venue_id)  { 1234 }

  subject(:instance) { ApiRequest::Foursquare.new(auth) }

  describe '#venue' do

    before(:each) do
      url = "#{ApiRequest::Foursquare::BASE_URI}/venues/#{venue_id}"
      cache = ApiRequest::Foursquare::CACHE_FOR
      params = { v: ApiRequest::Foursquare::API_VERSION }
      expect(instance).to receive(:fetch).with(url, params, cache).and_return(response)
    end

    let(:response) do
      JSON.parse('{"venue":"this is the venue"}')
    end

    it 'returns the response venue hash' do
      expect(instance.venue(venue_id)).to eq(response['venue'])
    end

  end

end
