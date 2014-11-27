require 'rails_helper'

RSpec.describe "search/index", :type => :view do

  describe 'search by current location form' do

    it 'renders inputs for lat and lng' do
      render

      expect(rendered).to have_selector('input[name="lat"]')
      expect(rendered).to have_selector('input[name="lng"]')
    end

  end

  describe 'search by address form' do

    it 'renders a input for postcode' do
      render

      expect(rendered).to have_selector('input[name="postcode"]')
    end

  end

end
