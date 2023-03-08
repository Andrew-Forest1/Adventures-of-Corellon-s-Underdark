class SpriteSerializer < ActiveModel::Serializer
  attributes :id, :name, :private, :image_url
  has_one :user
  #has_many :game_object_sprites
end
