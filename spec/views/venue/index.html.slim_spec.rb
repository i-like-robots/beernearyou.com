require 'rails_helper'

RSpec.describe "venue/index", :type => :view do

  let(:venue) { build(:venue) }

  before(:each) do
    assign(:venues, [ venue ] * 5)
  end

  it 'displays a list of all venues' do
    render

    expect(rendered).to have_selector('li', count: 5)
  end

  it 'creates a link for each venue' do
    render

    expect(rendered).to have_link(venue.name, href: "/venue/#{venue.foursquare_id}", count: 5)
  end

end
