class AddManaToCharacters < ActiveRecord::Migration[7.0]
  def change
    add_column :characters, :mana, :integer
  end
end
