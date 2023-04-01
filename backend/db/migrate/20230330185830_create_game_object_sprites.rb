class CreateGameObjectSprites < ActiveRecord::Migration[7.0]
  def change
    create_table :game_object_sprites do |t|
      t.references :sprite, null: false, foreign_key: {on_delete: :cascade}
      t.references :game_object, null: false, foreign_key: {on_delete: :cascade}

      t.timestamps
    end
  end
end
