class CreateCharacterAbilities < ActiveRecord::Migration[7.0]
  def change
    create_table :character_abilities do |t|
      t.references :character, null: false, foreign_key: {on_delete: :cascade}
      t.references :ability, null: false, foreign_key: {on_delete: :cascade}
      t.integer :slot

      t.timestamps
    end
  end
end
