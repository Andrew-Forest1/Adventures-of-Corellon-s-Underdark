class GameObjectSpriteSerializer < ActiveModel::Serializer
  attributes :id
  has_one :sprite
  has_one :game_object
end
