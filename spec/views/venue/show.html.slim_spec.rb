require 'rails_helper'

RSpec.describe "venue/show", :type => :view do

  let(:foursquare_data)   { JSON.parse(File.read('./spec/fixtures/foursquare/venue.json')) }
  let(:foursquare_images) { JSON.parse(File.read('./spec/fixtures/foursquare/venue_photos.json')) }
  let(:venue)             { double(attributes_for(:venue, :with_location)) }
  let(:nearest_station)   { double(attributes_for(:station).merge(distance: 0.14)) }

  before(:each) do
    expect(venue).to receive(:foursquare_data).at_least(1).times.and_return(foursquare_data)
    expect(venue).to receive(:foursquare_images).at_least(1).times.and_return(foursquare_images)
    assign(:nearest_station, nearest_station)
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

  it 'displays the nearest tube station' do
    render

    expect(rendered).to have_selector('p', text: "#{nearest_station.name}, #{nearest_station.distance} miles")
  end

  it 'display the venue opening times' do
    render

    expect(rendered).to have_selector('time', text: 'Mon–Sat: Noon–Midnight')
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
