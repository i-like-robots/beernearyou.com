require 'rails_helper'

RSpec.describe "suggestion/index", :type => :view do

  let(:suggestion) { build(:suggestion) }

  before(:each) do
    assign(:suggestion, suggestion)
  end

  it 'renders inputs for name and URL' do
    render

    expect(rendered).to have_selector('input[name="suggestion[name]"]')
    expect(rendered).to have_selector('input[name="suggestion[url]"]')
  end

  context 'with errors' do

    it 'displays the flash[:error] message' do
      flash.now[:error] = 'Success'

      render

      expect(rendered).to have_selector('.notice.notice--error')
    end

  end

  context 'on success' do

    it 'displays the flash[:success] message' do
      flash.now[:success] = 'Success'

      render

      expect(rendered).to have_selector('.notice.notice--success')
    end

  end

end
