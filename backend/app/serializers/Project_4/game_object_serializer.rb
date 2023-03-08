class GameObjectSerializer < ActiveModel::Serializer
  attributes :id, :x_pos, :y_pos, :rotation, :w_scale, :h_scale, :shape
  #has_one :scene
  has_one :sprite #, through: :game_object_sprite
  has_many :animations
end
