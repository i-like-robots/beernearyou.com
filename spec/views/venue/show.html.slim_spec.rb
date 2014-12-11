require 'rails_helper'

RSpec.describe "venue/show", :type => :view do

  let(:foursquare_data)   { JSON.parse(File.read('./spec/fixtures/foursquare/venue.json')) }
  let(:foursquare_images) { JSON.parse(File.read('./spec/fixtures/foursquare/venue_photos.json')) }
  let(:venue)             { build(:venue, :with_location) }

  before(:each) do
    expect(venue).to receive(:foursquare_data).at_least(1).times.and_return(foursquare_data)
    expect(venue).to receive(:foursquare_images).at_least(1).times.and_return(foursquare_images)
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

  it 'display the venue opening times' do
    render

    expect(rendered).to have_selector('dd', text: 'Mon–Sat')
    expect(rendered).to have_selector('dd', text: 'Noon–Midnight')
  end

  it 'displays gallery thumbnail images' do
    render

    expect(rendered).to have_selector('.Gallery-thumbnail', count: 5)
  end

  it 'renders gallery slideshow' do
    render

    expect(rendered).to have_selector('.Slideshow')
    expect(rendered).to have_selector('.Slideshow-frame', count: 30)
  end

end
