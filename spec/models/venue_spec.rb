require 'rails_helper'

RSpec.describe Venue, :type => :model do

  subject(:instance) { Venue.first }

  describe '#foursquare_data' do

    let(:client) do
      double('Foursquare service')
    end

    before(:each) do
      expect(instance.class).to receive(:foursquare_client).and_return(client)
    end

    it 'requests data from the Foursquare service' do
      expect(client).to receive(:venue).with('4fb67af3e4b014d752c9b6c7')
      instance.foursquare_data
    end

  end

end
