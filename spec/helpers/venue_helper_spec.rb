require 'rails_helper'

RSpec.describe VenueHelper, :type => :helper do

  describe '#formatted_opening_hours' do
    let(:timeframe) do
      {
        'days' => 'Mon–Sat',
        'open' => [
          {
            'renderedTime' => 'Noon–Midnight'
          }
        ]
      }
    end

    it 'returns concatenated days and opening times' do
      expect(helper.formatted_opening_hours(timeframe)).to eq('Mon–Sat: Noon–Midnight')
    end
  end

end
