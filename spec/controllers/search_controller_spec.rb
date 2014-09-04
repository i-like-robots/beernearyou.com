require 'rails_helper'

RSpec.describe SearchController, :type => :controller do

  describe '#index' do
  end

  describe '#results' do

    let(:stub) { build(:venue) }
    let(:origin) { [ 51.514150, -0.227108 ] }

    before(:each) do
      expect(subject).to receive(:find_venues_with_origin).with(origin).and_return(stub)
    end

    context 'search by location' do

      let(:query) { { lat: origin.first, lng: origin.last } }

      it 'finds nearby venues with given coordinates' do
        get :results, query
        expect(assigns(:venues)).to eq(stub)
        expect(assigns(:origin)).to eq(origin)
      end

    end

    context 'search by postcode' do

      let(:query) { { postcode: 'W12 7TQ' } }

      before(:each) do
        expect(subject).to receive(:create_origin_with_params).with(hash_including(query)).and_return(origin)
      end

      it 'finds nearby venues with given coordinates' do
        get :results, query
        expect(assigns(:venues)).to eq(stub)
        expect(assigns(:origin)).to eq(origin)
      end

    end

  end

end
