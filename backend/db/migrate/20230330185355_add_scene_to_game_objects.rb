class AddSceneToGameObjects < ActiveRecord::Migration[7.0]
  def change
    add_reference :game_objects, :scene, null: false, foreign_key: {on_delete: :cascade}
  end
end
