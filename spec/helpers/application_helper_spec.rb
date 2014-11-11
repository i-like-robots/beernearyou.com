require 'rails_helper'

RSpec.describe ApplicationHelper, :type => :helper do

  describe '#show_search_box' do
    it 'returns false for the home page' do
      expect(controller).to receive(:controller_name).and_return('search')
      expect(controller).to receive(:action_name).and_return('index')
      expect(helper.show_search_box).to be(false)
    end

    it 'returns true for any other page' do
      expect(controller).to receive(:controller_name).and_return('search')
      expect(controller).to receive(:action_name).and_return('results')
      expect(helper.show_search_box).to be(true)
    end
  end

end
