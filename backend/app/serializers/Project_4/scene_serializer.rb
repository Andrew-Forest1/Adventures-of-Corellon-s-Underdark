class SceneSerializer < ActiveModel::Serializer
  attributes :id, :name, :image
  has_one :user
  has_many :game_objects#, include: :all
  # has_many :sprites, through: :game_objects
  # def game_objects
  #   object.game_objects
  #   object.game_objects.map{|go| {id: go.id, x_pos: go.x_pos, y_pos: go.y_pos, rotation: go.rotation, w_scale: go.w_scale, h_scale: go.h_scale, shape: go.shape, sprite: go.sprite}}
  #   object.game_objects.map{|go| go.sprite}
  # end
end