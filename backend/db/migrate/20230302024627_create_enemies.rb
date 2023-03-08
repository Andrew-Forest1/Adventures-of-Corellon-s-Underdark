class CreateEnemies < ActiveRecord::Migration[7.0]
  def change
    create_table :enemies do |t|
      t.string :name
      t.integer :level
      t.integer :strength
      t.integer :agility
      t.integer :intellect
      t.integer :vitality
      t.integer :spirit

      t.timestamps
    end
  end
end
