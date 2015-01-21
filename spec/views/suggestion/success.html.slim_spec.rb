require 'rails_helper'

RSpec.describe "suggestion/success", :type => :view do

  it 'displays the flash[:success] message' do
    flash.now[:success] = 'Success'

    render

    expect(rendered).to have_selector('.Notice--success')
    expect(rendered).to have_content(/Thank you for your suggestion!/)
  end

end
