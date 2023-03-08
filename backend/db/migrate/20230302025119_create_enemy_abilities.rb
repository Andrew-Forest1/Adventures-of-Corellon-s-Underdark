class CreateEnemyAbilities < ActiveRecord::Migration[7.0]
  def change
    create_table :enemy_abilities do |t|
      t.references :ability, null: false, foreign_key: {on_delete: :cascade}
      t.references :enemy, null: false, foreign_key: {on_delete: :cascade}
      t.integer :slot

      t.timestamps
    end
  end
end
