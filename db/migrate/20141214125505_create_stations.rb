class CreateStations < ActiveRecord::Migration
  def change

    create_table :stations do |t|
      t.string :name
      t.decimal :lat, precision: 10, scale: 6
      t.decimal :lng, precision: 10, scale: 6
      t.integer :zone

      t.timestamps
    end

    add_index :stations, [:lat, :lng]

  end
end
