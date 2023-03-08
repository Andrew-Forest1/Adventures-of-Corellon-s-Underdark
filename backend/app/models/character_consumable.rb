class CharacterConsumable < ApplicationRecord
  belongs_to :consumable
  belongs_to :character
end
