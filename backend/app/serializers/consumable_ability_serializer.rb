class ConsumableAbilitySerializer < ActiveModel::Serializer
  attributes :id
  has_one :consumable
  has_one :ability
end
