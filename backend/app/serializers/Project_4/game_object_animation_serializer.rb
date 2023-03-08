class GameObjectAnimationSerializer < ActiveModel::Serializer
  attributes :id
  has_one :game_object
  has_one :animation
end
