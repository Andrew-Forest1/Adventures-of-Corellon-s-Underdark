class CharacterSerializer < ActiveModel::Serializer
  attributes :id, :name, :level, :experience, :points, :strength, :agility, :intellect, :vitality, :spirit, :image_url, :abilities, :progresses
  has_one :user
end
