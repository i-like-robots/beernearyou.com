require 'rails_helper'

RSpec.describe SearchHelper, :type => :helper do

  describe '#random_postcode' do
    it 'returns a random postcode' do
      expect(helper.random_postcode).to be_a(String)
    end
  end

end
