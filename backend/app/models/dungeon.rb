class Dungeon < ApplicationRecord
    has_many :dungeon_enemies
    has_many :enemies, through: :dungeon_enemies

    has_many :progresses
    has_many :characters, through: :progresses

    validates_presence_of :name, :min_level, :max_level
    validate :level_range

    def level_range
        if max_level < min_level
            errors.add(:dungeon, "Max level is greater than Minimum level")
        end
    end
end
