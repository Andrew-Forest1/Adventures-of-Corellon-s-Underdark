class SpriteSerializer < ActiveModel::Serializer
  attributes :id, :name, :private, :image_url
  has_one :user
end
