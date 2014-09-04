require 'rails_helper'

RSpec.describe Venue, :type => :model do

  subject(:instance) { build(:venue) }

  describe '#foursquare_data' do

    let(:client) { double('Foursquare service') }

    before(:each) do
      expect(instance.class).to receive(:foursquare_client).and_return(client)
    end

    it 'requests data from the Foursquare service' do
      expect(client).to receive(:venue).with('529655db11d20a5e5ce7251e')
      instance.foursquare_data
    end

  end

end
