class CreateDungeons < ActiveRecord::Migration[7.0]
  def change
    create_table :dungeons do |t|
      t.string :name
      t.integer :min_level
      t.integer :max_level
      t.text :description

      t.timestamps
    end
  end
end
