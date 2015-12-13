source 'https://rubygems.org'
ruby '2.2.3'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.5'

# Use Postgres as the database for Active Record
gem 'pg'

# Use Geocoder for location-based searches
gem 'geocoder'

# Use Sass for stylesheets
gem 'sass-rails', '~> 5.0.0'

# Use autoprefixer for stylesheets
gem 'autoprefixer-rails'

# Use jquery as the JavaScript library
gem 'jquery-rails'

# Use Slim for templates
gem 'slim-rails'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '~> 2.7.2'

# Use HTTParty to wrap requests
gem 'httparty'

# Use Humanizer to try and avoid spam bots
gem 'humanizer'

# Use Upmin to create an administration area
gem 'upmin-admin', github: 'upmin/upmin-admin-ruby'

group :development, :test do

  # Use .env file for local configuration
  gem 'dotenv-rails'

  # Use Rspec instead of Test::Unit
  gem 'rspec-rails'

  # Use Capybara for better view specs
  gem 'capybara'

  # Use Factory Girl for database fixtures
  gem 'factory_girl_rails'

end

group :development do

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'

  # Use Pry for simpler debugging
  gem 'pry'

  # Access an IRB console on exception pages or by using <%%= console %> in views
  gem 'web-console', '~> 2.0.0'

  # Use SCSS lint to check Sass style
  gem 'scss-lint'

end

group :production do

  # Use Puma as the app server
  gem 'puma', '~> 2.15.3'

  # Use 12Factor to log to stdout and serve static assets directly
  gem 'rails_12factor'

end
