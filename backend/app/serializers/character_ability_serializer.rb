class CharacterAbilitySerializer < ActiveModel::Serializer
  attributes :id, :slot 
  has_one :character
  has_one :ability
end
