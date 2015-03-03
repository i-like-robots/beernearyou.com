require 'rails_helper'

RSpec.describe VenueController, :type => :controller do

  describe '#index' do

    let(:venues) { build_list(:venue, 5, :with_location) }

    before(:each) do
      expect(Venue).to receive(:order).with(:name).and_return(venues)
    end

    it 'populates all venues' do
      get :index
      expect(assigns(:venues)).to eq(venues)
    end

  end

  describe '#show' do

    let(:id)                { '1234' }

    before(:each) do
      expect(Venue).to receive(:find_by).with(foursquare_id: id).and_return(venue)
    end

    context 'when venue exists' do

      let(:venue)             { build(:venue, :with_location) }
      let(:station)           { build(:station) }
      let(:nearest_stations)  { double(:nearest_stations) }

      it 'fetches the venue by Foursquare ID' do
        expect(Station).to receive(:near).with(venue.coordinates).and_return(nearest_stations)
        expect(nearest_stations).to receive(:limit).and_return([station])

        get :show, { id: id }

        expect(assigns(:venue)).to eq(venue)
        expect(assigns(:nearest_station)).to eq(station)
      end

    end

    context 'when venue does not exist' do

      let(:venue) { nil }

      it 'raises a not found error' do
        expect { get :show, { id: id } }.to raise_error(ActionController::RoutingError)
      end

    end

  end

end
