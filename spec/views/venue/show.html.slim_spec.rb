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

    expect(rendered).to have_selector('dd', text: venue.coordinates)
    expect(rendered).to have_content(venue.street_address)
  end

end
