require 'rails_helper'

RSpec.describe ApiRequest::Foursquare do

  let(:auth) { { id: 'user_id', token: 'user_token' } }

  subject(:instance) { ApiRequest::Foursquare.new(auth) }

  describe '#venue' do

    before(:each) do
      expect(instance).to receive(:fetch).and_return(response)
    end

    context 'success' do

      let(:response) do
        JSON.parse('{"meta":{"code":200},"response":{"venue":"this is the venue"}}')
      end

      it 'returns the response venue hash' do
        expect(instance.venue(1234)).to eq(response['response']['venue'])
      end

    end

    context 'fail' do

      let(:response) do
        JSON.parse('{"meta":{"code":500},"response":{}}')
      end

      it 'raises an error' do
        expect { instance.venue(1234) }.to raise_error(StandardError)
      end

    end

  end

end
