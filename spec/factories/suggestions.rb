FactoryGirl.define do

  factory :suggestion do
    name ''
    url ''
    bypass_humanizer true

    trait :with_name do
      name 'Old Red Cow'
    end

    trait :with_url do
      url 'http://theoldredcow.com/'
    end

  end

end
