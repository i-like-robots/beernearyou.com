require 'rails_helper'

RSpec.describe "venue/index", :type => :view do

  let(:venues) { build_list(:venue, 5, :with_location) }

  before(:each) do
    assign(:venues, venues)
  end

  it 'displays a list of all venues' do
    render

    expect(rendered).to have_selector('li', count: 5)
  end

  it 'creates a link for each venue' do
    render

    expect(rendered).to have_link(venues.first.name, href: "/venue/#{venues.first.foursquare_id}", count: 5)
  end

end
