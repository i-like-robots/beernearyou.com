require 'rails_helper'

RSpec.describe SearchController, :type => :controller do

  describe '#index' do
  end

  describe '#results' do

    context 'within range' do

      let(:origin) { [ 51.514150, -0.227108 ] }
      let(:venues) { build_list(:venue, 5, :with_location) }

      before(:each) do
        expect(subject).to receive(:find_venues_with_origin).with(origin).and_return(venues)
      end

      context 'search by location' do

        let(:query) { { lat: origin.first, lng: origin.last } }

        it 'finds nearby venues with given coordinates' do
          get :results, query
          expect(assigns(:live)).to eq(true)
          expect(assigns(:venues)).to eq(venues)
          expect(assigns(:origin)).to eq(origin)
          expect(assigns(:within_bounds)).to eq(true)
        end

      end

      context 'search by postcode' do

        let(:query) { { postcode: 'W12 7TQ' } }

        before(:each) do
          expect(subject).to receive(:create_origin_with_params).with(hash_including(query)).and_return(origin)
        end

        it 'finds nearby venues with given coordinates' do
          get :results, query
          expect(assigns(:live)).to_not eq(true)
          expect(assigns(:venues)).to eq(venues)
          expect(assigns(:origin)).to eq(origin)
          expect(assigns(:within_bounds)).to eq(true)
        end

      end

    end

    context 'outside range' do

      let(:origin) { [ 75.7667, 99.7833 ] }
      let(:query)  { { lat: origin.first, lng: origin.last } }

      before(:each) do
        expect(subject).not_to receive(:find_venues_with_origin)
      end

      it 'sets out of bounds flag' do
        get :results, query
        expect(assigns(:venues)).to eq(nil)
        expect(assigns(:within_bounds)).to eq(false)
      end

    end

  end

end
