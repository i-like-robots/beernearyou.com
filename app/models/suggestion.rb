class Suggestion < ActiveRecord::Base
  validates_presence_of :name, message: 'please enter a name'
  validates_presence_of :url, message: 'please enter a URL'
end
