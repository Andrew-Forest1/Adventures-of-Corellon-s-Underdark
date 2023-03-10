class AddHealthToCharacters < ActiveRecord::Migration[7.0]
  def change
    add_column :characters, :health, :integer
    add_column :characters, :gold, :integer
  end
end
