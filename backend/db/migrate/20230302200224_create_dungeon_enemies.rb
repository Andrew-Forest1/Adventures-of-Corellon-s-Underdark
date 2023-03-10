class CreateDungeonEnemies < ActiveRecord::Migration[7.0]
  def change
    create_table :dungeon_enemies do |t|
      t.references :enemy, null: false, foreign_key: {on_delete: :cascade}
      t.references :dungeon, null: false, foreign_key: {on_delete: :cascade}

      t.timestamps
    end
  end
end
