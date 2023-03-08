class CreateAbilities < ActiveRecord::Migration[7.0]
  def change
    create_table :abilities do |t|
      t.string :name
      t.string :ability_type
      t.integer :damage
      t.integer :cooldown
      t.integer :uses
      t.string :effect
      t.integer :cast
      t.integer :mana

      t.timestamps
    end
  end
end
