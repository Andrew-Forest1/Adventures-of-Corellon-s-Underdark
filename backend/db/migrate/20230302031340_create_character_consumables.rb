class CreateCharacterConsumables < ActiveRecord::Migration[7.0]
  def change
    create_table :character_consumables do |t|
      t.references :consumable, null: false, foreign_key: {on_delete: :cascade}
      t.references :character, null: false, foreign_key: {on_delete: :cascade}

      t.timestamps
    end
  end
end
