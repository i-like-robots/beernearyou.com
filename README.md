# Beer Near You

[ ![Codeship Status for i-like-robots/beernearyou.com](https://codeship.com/projects/f3cc2280-aad4-0132-d616-42094b33273a/status?branch=master)](https://codeship.com/projects/68104)

[Beer Near You][site] is an application to help users find decent beers in London. It uses data from Foursquare, London Datastore and Nominatim.

## Cool front-end stuff

- Able to use a device's location and orientation to provide live distance and direction.
- Draggable and swipey widgets for touch-enabled devices.
- Lots of performance enhancements for the browser.

## System dependencies

- Ruby 2.1.0+
- PostgreSQL 9+
- Bundler

## Local project setup and configuration

```sh
# Clone this Git repo
git clone https://github.com/i-like-robots/beer-near-you.git && cd beer-near-you

# Set the Ruby version if you use RVM or rbenv
cp .ruby-version.example .ruby-version && cd .

# Add database configuration
cp config/database.yml.example config/database.yml && open config/database.yml

# Add environment configuration
cp .env.example .env && open .env

# Install application dependencies
bundle install --without=production

# Setup database and import London Underground station data
bundle exec rake db:setup stations:import

# Run the development server
bundle exec rails s
```

## Continuous delivery

```sh
# Install application dependencies
bundle install --without=development

# Add example environment configuration
cp .env.example .env

# Set the environment to test
export RAILS_ENV=test

# Setup empty database
bundle exec rake db:create db:schema:load

# Run the specs
bundle exec rake spec
```

## Deployment instructions

```sh
# Stop any currently running Puma process
[ -f tmp/pids/puma.pid ] && kill -QUIT `cat tmp/pids/puma.pid`

# Install required dependencies and lock the bundle
bundle install --deployment

# Set the environment to production
export RAILS_ENV=production

# Clear temporary files, run any database migrations and recompile assets
bundle exec rake tmp:clear db:migrate assets:clean assets:precompile

# Start Puma server daemon
bundle exec puma -C config/puma.rb -d
```

[site]: http://beernearyou.com
