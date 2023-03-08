class Ability < ApplicationRecord
    has_many :character_abilities
    has_many :characters, through: :character_abilities

    has_many :enemy_abilities
    has_many :enemies, through: :enemy_abilities

    has_many :consumable_abilities
    has_many :consumables, through: :consumable_abilities
end
