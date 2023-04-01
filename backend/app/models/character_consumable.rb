class CharacterConsumable < ApplicationRecord
  belongs_to :consumable
  belongs_to :character

  validates :amount, numericality: {greater_than_or_equal_to: 0}
end
