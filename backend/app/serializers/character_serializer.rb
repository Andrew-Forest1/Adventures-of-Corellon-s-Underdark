class CharacterSerializer < ActiveModel::Serializer
  attributes :id, :name, :level, :experience, :points, :strength, :agility, :intellect, :vitality, :spirit, :image_url, :abilities, :progresses, :health, :gold
  has_one :user
end
