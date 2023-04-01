class CreateScenes < ActiveRecord::Migration[7.0]
  def change
    create_table :scenes do |t|
      t.string :name
      t.references :user, null: false, foreign_key: {on_delete: :cascade}
      t.text :image

      t.timestamps
    end
  end
end
