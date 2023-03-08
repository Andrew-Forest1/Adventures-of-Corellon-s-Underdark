class CreateCharacters < ActiveRecord::Migration[7.0]
  def change
    create_table :characters do |t|
      t.string :name
      t.integer :level
      t.integer :experience
      t.integer :points
      t.integer :strength
      t.integer :agility
      t.integer :intellect
      t.integer :vitality
      t.integer :spirit
      t.references :user, null: false, foreign_key: {on_delete: :cascade}

      t.timestamps
    end
  end
end
