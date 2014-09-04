require 'rails_helper'

RSpec.describe VenueController, :type => :controller do

  describe '#index' do

    let(:stub) { build(:venue) }

    before(:each) do
      expect(Venue).to receive(:all).and_return(stub)
    end

    it 'populates all venues' do
      get :index
      expect(assigns(:venues)).to eq(stub)
    end

  end

  describe '#show' do

    let(:stub) { build(:venue) }
    let(:id)   { '1234' }

    before(:each) do
      expect(Venue).to receive(:find_by).with(foursquare_id: id).and_return(stub)
    end

    it 'fetches the venue by Foursquare ID' do
      get :show,  { id: id }
      expect(assigns(:venue)).to eq(stub)
    end

  end

end
