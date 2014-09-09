class SetupVenues < ActiveRecord::Migration
  def change

    create_table :venues do |t|
      t.string    :name
      t.string    :foursquare_id
      t.integer   :untappd_id
      t.decimal   :lat, precision: 10, scale: 6
      t.decimal   :lng, precision: 10, scale: 6
      t.string    :street_address
      t.string    :city
      t.string    :postal_code
      t.datetime  :created_at
      t.datetime  :updated_at

      t.timestamps
    end

    add_index :venues, [:foursquare_id]
    add_index :venues, [:untappd_id]
    add_index :venues, [:lat, :lng]

  end
end
