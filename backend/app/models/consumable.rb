class Consumable < ApplicationRecord
    has_many :consumable_abilities
    has_many :abilities, through: :consumable_abilities

    has_many :character_consumables
    has_many :characters, through: :character_consumables
end
