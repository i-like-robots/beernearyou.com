class SuggestionController < ApplicationController

  def new
    @suggestion = Suggestion.new
  end

  def create
    @suggestion = Suggestion.new(suggestion_params)

    if @suggestion.save
      mail = SuggestionMailer.new_suggestion_email(@suggestion)
      mail.deliver_now

      flash.now[:success] = 'Suggestion saved'
      redirect_to(action: 'success')
    else
      flash.now[:error] = "Suggestion failed, #{@suggestion.errors.first.last}"
      render :new
    end
  end

  def success
  end

  private

  def suggestion_params
    params.require(:suggestion).permit(:name, :url, :humanizer_answer, :humanizer_question_id)
  end

end
