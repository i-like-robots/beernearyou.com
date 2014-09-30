require 'rails_helper'

RSpec.describe SuggestionMailer, :type => :mailer do

  let(:suggestion) { create(:suggestion, :with_name, :with_url) }
  let(:mail) { SuggestionMailer.new_suggestion_email(suggestion) }

  after(:each) do
    ActionMailer::Base.deliveries.clear
  end

  it 'sends an email' do
    mail.deliver
    expect(ActionMailer::Base.deliveries.count).to eq(1)
  end

  it 'renders suggestion name and URL to email body' do
    expect(mail.body.encoded).to match(suggestion.name)
    expect(mail.body.encoded).to match(suggestion.url)
  end

end
