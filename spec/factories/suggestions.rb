FactoryGirl.define do

  factory :suggestion do
    name 'Old Red Cow'

    trait :with_url do
      url 'http://theoldredcow.com/'
    end

  end

end
