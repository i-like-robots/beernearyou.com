# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140828125704) do

  create_table "venue_locations", force: true do |t|
    t.integer  "venue_id"
    t.decimal  "latitude",       precision: 10, scale: 6
    t.decimal  "longitude",      precision: 10, scale: 6
    t.string   "street_address"
    t.string   "city"
    t.string   "postal_code"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "venue_locations", ["venue_id"], name: "index_venue_locations_on_venue_id"

  create_table "venue_stats", force: true do |t|
    t.integer  "venue_id"
    t.integer  "checkin_total"
    t.text     "top_beers"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "venue_stats", ["venue_id"], name: "index_venue_stats_on_venue_id"

  create_table "venues", force: true do |t|
    t.string   "name"
    t.string   "foursquare_id"
    t.integer  "untappd_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "venues", ["foursquare_id"], name: "index_venues_on_foursquare_id"
  add_index "venues", ["untappd_id"], name: "index_venues_on_untappd_id"

end
