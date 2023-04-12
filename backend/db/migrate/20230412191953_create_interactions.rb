class CreateInteractions < ActiveRecord::Migration[7.0]
  def change
    create_table :interactions do |t|
      t.references :game_object, null: false, foreign_key: {on_delete: :cascade}
      t.string :event
      t.text :contents

      t.timestamps
    end
  end
end
