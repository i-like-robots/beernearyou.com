require 'rails_helper'

RSpec.describe ApiRequest::Foursquare do

  let(:auth)          { { id: 'user_id', token: 'user_token' } }
  let(:venue_id)      { 1234 }
  let(:base_url)      { ApiRequest::Foursquare::BASE_URI }
  let(:base_params)   { { v: ApiRequest::Foursquare::API_VERSION } }
  let(:cache_length)  { ApiRequest::Foursquare::CACHE_FOR }

  subject(:instance) { ApiRequest::Foursquare.new(auth) }

  before(:each) do
    expect(instance).to receive(:fetch).with(endpoint, base_params, cache_length).and_return(response)
  end

  describe '#venue' do

    let(:endpoint) { "#{base_url}/venues/#{venue_id}" }
    let(:response) { JSON.parse('{"venue":"this is the venue"}') }

    it 'returns the response venue hash' do
      expect(instance.venue(venue_id)).to eq(response['venue'])
    end

  end

  describe '#venue_photos' do

    let(:endpoint) { "#{base_url}/venues/#{venue_id}/photos" }
    let(:response) { JSON.parse('{"photos":"these are the photos"}') }

    it 'returns the response photos hash' do
      expect(instance.venue_photos(venue_id)).to eq(response['photos'])
    end

  end

end
