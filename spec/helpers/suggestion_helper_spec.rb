require 'rails_helper'

RSpec.describe SuggestionHelper, :type => :helper do

  describe '#random_venue_name' do
    it 'returns a random venue name' do
      expect(helper.random_venue_name).to be_a(String)
    end
  end

end
