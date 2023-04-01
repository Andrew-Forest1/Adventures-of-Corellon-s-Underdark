class CharacterConsumableSerializer < ActiveModel::Serializer
  attributes :id, :amount
  has_one :consumable
  has_one :character
end
