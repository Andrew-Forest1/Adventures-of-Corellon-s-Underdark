class CreateConsumables < ActiveRecord::Migration[7.0]
  def change
    create_table :consumables do |t|
      t.string :name

      t.timestamps
    end
  end
end
