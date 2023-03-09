class Progress < ApplicationRecord
  belongs_to :character
  belongs_to :dungeon
  belongs_to :dungeon_enemy
end
