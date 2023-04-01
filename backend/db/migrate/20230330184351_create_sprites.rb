class CreateSprites < ActiveRecord::Migration[7.0]
  def change
    create_table :sprites do |t|
      t.string :name
      t.references :user, null: false, foreign_key: {on_delete: :cascade}
      t.boolean :private

      t.timestamps
    end
  end
end
