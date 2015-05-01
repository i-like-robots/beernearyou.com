class SuggestionMailer < ActionMailer::Base
  default from: 'no-reply@example.com', to: APP_CONFIG['admin_email']

  def new_suggestion_email(suggestion)
    @suggestion = suggestion
    mail(subject: 'New suggestion')
  end

end
