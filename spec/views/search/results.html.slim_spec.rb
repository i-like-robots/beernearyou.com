require 'rails_helper'

RSpec.describe "search/results", :type => :view do

  let(:origin) { [ 51.514150, -0.227108 ] }
  let(:venue)  do
    double({
      name: 'BrewDog Shepherds Bush',
      foursquare_id:  '529655db11d20a5e5ce7251e',
      latitude: 51.5030784148458,
      longitude: -0.224192154875118,
      full_address: '15-19 Goldhawk Rd, W12 8QQ',
      distance: '0.675'
    })
  end

  context 'with no location' do

    it 'displays an error notice' do
      render

      expect(rendered).to have_selector('.notice--error')
      expect(rendered).to have_content(/Your location was not provided or could not be found/)
    end

  end

  context 'with no results' do

    before(:each) do
      assign(:origin, origin)
      assign(:venues, [])
    end

    it 'displays a no results notice' do
      render

      expect(rendered).to have_selector('.notice--warning')
      expect(rendered).to have_content(/No results were found/)
      expect(rendered).to have_link('Try again?')
    end

  end

  context 'with results' do

    before(:each) do
      assign(:origin, origin)
      assign(:venues, [ venue ] * 5)
    end

    it 'displays a list of results' do
      render

      expect(rendered).to have_selector("#results[data-lat='#{origin.first}'][data-lng='#{origin.last}']")
      expect(rendered).to have_selector("li[data-lat='#{venue.latitude}'][data-lng='#{venue.longitude}']", count: 5)
    end

    it 'displays each result with a link and distance' do
      render

      expect(rendered).to have_link(venue.name, href: "/venue/#{venue.foursquare_id}", count: 5)
      expect(rendered).to have_selector('dd', text: "#{venue.distance} miles", count: 5)
    end

    it 'displays a map' do
      render

      expect(rendered).to  have_selector('#map')
    end

  end

end