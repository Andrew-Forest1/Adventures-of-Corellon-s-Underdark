class CreateGameObjects < ActiveRecord::Migration[7.0]
  def change
    create_table :game_objects do |t|
      t.float :x_pos
      t.float :y_pos
      t.float :rotation
      t.float :w_scale
      t.float :h_scale
      t.string :shape

      t.timestamps
    end
  end
end
