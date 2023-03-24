class CharacterSerializer < ActiveModel::Serializer
  attributes :id, :name, :level, :experience, :points, :strength, :agility, :intellect, :vitality, :spirit, :image_url, :abilities, :progresses, :health, :mana, :gold, :consumables
  has_one :user
end
