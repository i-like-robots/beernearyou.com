require 'rails_helper'

RSpec.describe "venue/show", :type => :view do

  let(:venue) { build(:venue, :with_location) }

  before(:each) do
    assign(:venue, venue)
  end

  it 'displays the venue name' do
    render

    expect(rendered).to have_selector('h1', text: venue.name)
  end

  it 'displays the venue location' do
    render

    expect(rendered).to have_selector('address', text: venue.street_address)
    expect(rendered).to have_selector('address', text: venue.city)
    expect(rendered).to have_selector('address', text: venue.postal_code)
  end

end
