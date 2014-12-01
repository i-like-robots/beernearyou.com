require 'rails_helper'

RSpec.describe "search/results", :type => :view do

  let(:origin) { [ 51.514150, -0.227108 ] }
  let(:result)  do
    double({
      name: 'BrewDog Shepherds Bush',
      foursquare_id:  '529655db11d20a5e5ce7251e',
      lat: 51.5030784148458,
      lng: -0.224192154875118,
      street_address: '15-19 Goldhawk Rd',
      city: 'Shepherds Bush',
      postal_code: 'W12 8QQ',
      distance: 0.675,
      bearing: 85.1
    })
  end

  context 'with no location' do

    it 'displays an error notice' do
      render

      expect(rendered).to have_selector('.Notice--error')
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

      expect(rendered).to have_selector('.Notice--warning')
      expect(rendered).to have_content(/No results were found/)
      expect(rendered).to have_link('Try again?')
    end

  end

  context 'with results' do

    before(:each) do
      assign(:origin, origin)
      assign(:venues, [ result ] * 5)
    end

    it 'displays a list of results' do
      render

      expect(rendered).to have_selector(".SearchResults-results[data-lat='#{origin.first}'][data-lng='#{origin.last}']")
      expect(rendered).to have_selector(".SearchResults-item[data-lat='#{result.lat}'][data-lng='#{result.lng}']", count: 5)
    end

    it 'displays each result with a link, name, street address and distance' do
      render

      expect(rendered).to have_link(result.name, href: "/venue/#{result.foursquare_id}", count: 5)
      expect(rendered).to have_selector('.SearchResults-itemHeading', text: result.name, count: 5)
      expect(rendered).to have_selector('.SearchResults-itemAddress', text: result.street_address, count: 5)
      expect(rendered).to have_selector('.SearchResults-itemDistance', text: "#{'%.2f' % result.distance} miles", count: 5)
    end

    it 'displays a map' do
      render

      expect(rendered).to  have_selector('#map')
    end

  end

end
