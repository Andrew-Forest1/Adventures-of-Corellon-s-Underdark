class DungeonEnemy < ApplicationRecord
  belongs_to :enemy
  belongs_to :dungeon
  has_many :progresses
end
