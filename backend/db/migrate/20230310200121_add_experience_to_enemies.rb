class AddExperienceToEnemies < ActiveRecord::Migration[7.0]
  def change
    add_column :enemies, :experience, :integer
  end
end
