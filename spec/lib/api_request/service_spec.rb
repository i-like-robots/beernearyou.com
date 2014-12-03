require 'rails_helper'

RSpec.describe ApiRequest::Service do

  let(:auth)      { { id: 'user_id', token: 'user_token' } }

  subject(:instance) { ApiRequest::Service.new(auth) }

  describe '#fetch' do

    let(:url)       { 'http://api.service.com' }
    let(:params)    { { action: 'get' } }
    let(:expected)  { "#{url}?action=#{params[:action]}&id=#{auth[:id]}&token=#{auth[:token]}" }

    before(:each) do
      expect(HTTParty).to receive(:get).with(expected).and_return(response)
    end

    context 'success' do

      let(:response) do
        JSON.parse('{"meta":{"code":200},"response":{"venue":"this is the venue"}}')
      end

      it 'returns the response content' do
        expect(instance.fetch(url, params, 0)).to eq(response['response'])
      end

    end

    context 'failure' do

      let(:response) do
        JSON.parse('{"meta":{"code":500},"response":{}}')
      end

      it 'raises an error' do
        expect { instance.fetch(url, params, 0) }.to raise_error(StandardError)
      end

    end

  end

end
