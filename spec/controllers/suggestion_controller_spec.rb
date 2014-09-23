require 'rails_helper'

RSpec.describe SuggestionController, :type => :controller do

  describe "GET index" do
    it "returns http success" do
      get :index
      expect(response).to be_success
    end
  end

  describe "POST create" do
    it "returns http success" do
      post :index
      expect(response).to be_success
    end
  end

end
