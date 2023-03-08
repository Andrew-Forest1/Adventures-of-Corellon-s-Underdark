class CreateConsumableAbilities < ActiveRecord::Migration[7.0]
  def change
    create_table :consumable_abilities do |t|
      t.references :consumable, null: false, foreign_key: {on_delete: :cascade}
      t.references :ability, null: false, foreign_key: {on_delete: :cascade}

      t.timestamps
    end
  end
end
