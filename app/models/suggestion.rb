class Suggestion < ActiveRecord::Base
  validates :name, presence: true
  upmin_attributes :name, :url
end
