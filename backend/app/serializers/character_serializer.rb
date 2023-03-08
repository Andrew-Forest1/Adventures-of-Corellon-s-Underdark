class CharacterSerializer < ActiveModel::Serializer
  attributes :id, :name, :level, :experience, :points, :strength, :agility, :intellect, :vitality, :spirit, :image_url, :abilities
  has_one :user
end
