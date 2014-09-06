require 'rails_helper'

RSpec.describe "venue/show", :type => :view do

  let(:venue)    { build(:venue) }

  before(:each) do
    assign(:venue, venue)
  end

  it 'displays the venue name' do
    render

    expect(rendered).to have_selector('h1', text: venue.name)
  end

end
