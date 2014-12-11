FactoryGirl.define do

  factory :venue do
    name 'BrewDog Shepherds Bush'
    foursquare_id  '529655db11d20a5e5ce7251e'
    untappd_id 1192406

    trait :with_location do
      lat 51.5030784148458
      lng -0.224192154875118
      street_address '15-19 Goldhawk Rd'
      city 'Shepherds Bush'
      postal_code 'W12 8QQ'
    end

    trait :with_distance do
      distance { 0.625 }
    end

  end

end
