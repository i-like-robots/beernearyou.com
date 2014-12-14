require 'rails_helper'

RSpec.describe Venue, :type => :model do

  context 'current records' do

    # Don't create a saved instance, it would invoke callbacks
    subject(:instance) { build(:venue, :with_location) }

    describe '#full_address' do

      it 'returns the full address' do
        actual = instance.full_address
        expected = '15-19 Goldhawk Rd, Shepherds Bush, W12 8QQ'

        expect(actual).to eq(expected)
      end

    end

    describe '#coordinates' do

      it 'returns concatenated coordinates' do
        actual = instance.coordinates
        expected = [51.5030784148458, -0.224192154875118]

        expect(actual).to eq(expected)
      end

    end

    describe '#foursquare_data' do

      let(:client) { double('Foursquare client') }

      before(:each) do
        expect(instance.class).to receive(:foursquare_client).and_return(client)
      end

      it 'requests data from the Foursquare service' do
        expect(client).to receive(:venue).with('529655db11d20a5e5ce7251e')
        instance.foursquare_data
      end

    end

  end

  context 'new records' do

    subject(:instance) { build(:venue) }

    describe 'before_create' do

      it 'triggers add_location' do
        expect(instance).to receive(:add_location)
        instance.save
      end

    end

    describe '#add_location' do

      # Use string keys because API would be returning JSON
      let(:location) do
        {
          'location' => {
            'lat' => 51.503078,
            'lng' => -0.224192,
            'address' => '15-19 Goldhawk Rd',
            'city' => 'Shepherds Bush',
            'postalCode' => 'W12 8QQ'
          }
        }
      end

      before(:each) do
        expect(instance).to receive(:foursquare_data).and_return(location)
      end

      it 'appends location data to record' do
        instance.add_location

        expect(instance.lat).to eq(location['location']['lat'])
        expect(instance.lng).to eq(location['location']['lng'])
      end

    end

  end

end
