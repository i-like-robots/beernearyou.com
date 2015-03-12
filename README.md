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
bundle install

# Setup database and import London Underground station data
bundle exec rake db:setup stations:import

# Run the specs to ensure that everything has been setup correctly
bundle exec rake spec

# Run the development server
bundle exec rails s
```

## Deployment instructions

```sh
# Stop currently running Unicorn process
[ -f tmp/unicorn.pid ] && kill -QUIT `cat tmp/unicorn.pid`

# Install required dependencies and lock the bundle
bundle install --deployment

# Clear temporary files, run any database migrations and recompile assets
RAILS_ENV=production bundle exec rake tmp:clear db:migrate assets:clean assets:precompile

# Start Unicorn server daemon
bundle exec unicorn -E production -c config/unicorn.rb -D
```

[site]: http://beernearyou.com
