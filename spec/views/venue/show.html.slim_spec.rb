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

  it 'displays the venue phone number' do
    render

    expect(rendered).to have_selector('p', text: 'Call 020 8749 8094')
  end

  it 'displays the nearest tube station' do
    render

    expect(rendered).to have_selector('p', text: "#{nearest_station.name}")
    expect(rendered).to have_selector('p', text: "Zone #{nearest_station.zone}")
    expect(rendered).to have_selector('p', text: "#{nearest_station.distance} miles")
  end

  it 'displays the venue opening times' do
    render

    expect(rendered).to have_selector('time', text: 'Mon–Sat: Noon–Midnight')
  end

  it 'displays links to further information' do
    render

    expect(rendered).to have_selector("a[href='#{foursquare_data['url']}']")
    expect(rendered).to have_selector('a[href^="https://twitter.com"]')
    expect(rendered).to have_selector("a[href='#{foursquare_data['shortUrl']}']")
    expect(rendered).to have_selector("a[href='https://untappd.com/venue/#{venue.untappd_id}']")
  end

  it 'displays gallery preview image' do
    render

    expect(rendered).to have_selector('.Gallery-preview')
  end

  it 'renders gallery slideshow' do
    render

    expect(rendered).to have_selector('.Slideshow')
    expect(rendered).to have_selector('.Slideshow-frame', count: 20)
  end

end
