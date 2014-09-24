require 'rails_helper'

RSpec.describe SuggestionController, :type => :controller do

  describe "#create" do

    let(:params)     { attributes_for(:suggestion) }
    let(:form_data)  { { suggestion: params } }

    context 'with invalid data' do

      it 'does not save the suggestion' do
        post :create, form_data
        suggestion = assigns(:suggestion)

        expect(suggestion.persisted?).to be(false)
      end

    end

    context 'with valid data' do

      let(:params) { attributes_for(:suggestion, :with_name) }

      it 'saves the suggestion' do
        post :create, form_data
        suggestion = assigns(:suggestion)

        expect(suggestion.name).to be(params[:name])
        expect(suggestion.persisted?).to be(true)
      end

    end

  end

end
