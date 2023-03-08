class CharacterAbility < ApplicationRecord
  belongs_to :character
  belongs_to :ability
end
