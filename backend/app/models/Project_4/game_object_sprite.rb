class GameObjectSprite < ApplicationRecord
  belongs_to :sprite
  belongs_to :game_object
end
