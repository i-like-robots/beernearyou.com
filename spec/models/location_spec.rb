require 'rails_helper'

RSpec.describe Location, :type => :model do

  subject(:instance) { Location.first }

  describe '#full_address' do

    it 'returns the full address' do
      actual = instance.full_address
      expected = '25-29 Sicilian Ave, London, WC1A 2QH'

      expect(actual).to eq(expected)
    end

  end

  describe '#coordinates' do

    it 'returns concatenated coordinates' do
      actual = instance.coordinates
      expected = '51.5187307024007, -0.12148312134648'

      expect(actual).to eq(expected)
    end

  end

end
