class SuggestionMailer < ActionMailer::Base
  default from: 'no-reply@example.com', to: ENV['ADMIN_EMAIL']

  def new_suggestion_email(suggestion)
    @suggestion = suggestion
    mail(subject: 'New suggestion')
  end

end
