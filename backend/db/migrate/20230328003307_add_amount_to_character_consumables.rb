class AddAmountToCharacterConsumables < ActiveRecord::Migration[7.0]
  def change
    add_column :character_consumables, :amount, :integer
  end
end
