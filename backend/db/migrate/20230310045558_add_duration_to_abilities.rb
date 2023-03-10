class AddDurationToAbilities < ActiveRecord::Migration[7.0]
  def change
    add_column :abilities, :duration, :integer
  end
end
