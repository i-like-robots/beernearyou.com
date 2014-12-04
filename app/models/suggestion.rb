class Suggestion < ActiveRecord::Base
  include Humanizer

  attr_accessor :bypass_humanizer, :humanizer_answer, :humanizer_question_id
  require_human_on :create, unless: :bypass_humanizer

  validates_presence_of :name, message: 'please enter a name'
  validates_presence_of :url, message: 'please enter a URL'
end
