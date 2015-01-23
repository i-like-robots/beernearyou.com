require 'rails_helper'

RSpec.describe SuggestionController, :type => :controller do

  describe "#create" do

    let(:suggestion)  { build(:suggestion) }
    let(:form_data)   { attributes_for(:suggestion) }
    let(:post_data)   { { suggestion: form_data } }

    subject { post :create, post_data }

    before(:each) do
      expect(Suggestion).to receive(:new).and_return(suggestion)
    end

    context 'with invalid data' do

      it 'does not save the suggestion' do
        subject
        expect(assigns(:suggestion).persisted?).to eq(false)
      end

      it 'renders the new suggestion form' do
        expect(subject).to render_template(:new)
      end

    end

    context 'with valid data' do

      let(:mailer)      { double(:mailer) }
      let(:suggestion)  { build(:suggestion, :with_name, :with_url) }
      let(:form_data)   { attributes_for(:suggestion, :with_name, :with_url) }

      before(:each) do
        expect(SuggestionMailer).to receive(:new_suggestion_email).and_return(mailer)
        expect(mailer).to receive(:deliver_now)
      end

      it 'saves the suggestion' do
        subject

        expect(assigns(:suggestion).name).to eq(form_data[:name])
        expect(assigns(:suggestion).url).to eq(form_data[:url])
        expect(assigns(:suggestion).persisted?).to eq(true)
      end

      it 'redirects to the success page' do
        expect(subject).to redirect_to(action: 'success')
      end

    end

  end

end
