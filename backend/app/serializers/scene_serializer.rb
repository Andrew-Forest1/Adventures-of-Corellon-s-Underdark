class SceneSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :background
  has_one :user
  has_many :game_objects
end
