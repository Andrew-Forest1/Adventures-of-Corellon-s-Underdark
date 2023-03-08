class CharacterConsumableSerializer < ActiveModel::Serializer
  attributes :id
  has_one :consumable
  has_one :character
end
