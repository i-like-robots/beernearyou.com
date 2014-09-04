require 'rails_helper'

RSpec.describe Location, :type => :model do

  subject(:instance) { build(:location) }

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
      expected = '51.5030784148458, -0.224192154875118'

      expect(actual).to eq(expected)
    end

  end

end
