require 'rails_helper'

RSpec.describe ApiRequest::Service do

  let(:auth) { { id: 'user_id', token: 'user_token' } }

  subject(:instance) { ApiRequest::Service.new(auth) }

  describe '#fetch' do

    it 'assembles URL and delegates get request to HTTParty' do
      url = 'http://api.service.com'
      params = { venue: 1234, action: 'get' }
      expected = "#{url}?venue=1234&action=get&id=user_id&token=user_token"

      expect(HTTParty).to receive(:get).with(expected)

      instance.fetch(url, params, 0)
    end

  end

end
