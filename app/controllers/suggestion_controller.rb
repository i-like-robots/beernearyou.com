class SuggestionController < ApplicationController

  def index
    @suggestion = Suggestion.new
  end

  def create
    @suggestion = Suggestion.new(suggestion_params)

    if @suggestion.save
      flash.now[:success] = 'Suggestion saved'
      SuggestionMailer.new_suggestion_email(@suggestion).deliver
    else
      error = @suggestion.errors.first
      flash.now[:error] = "Suggestion failed, #{error.last}"
    end

    render :index
  end

  private

  def suggestion_params
    params.require(:suggestion).permit(:name, :url)
  end

end
