class AbilitySerializer < ActiveModel::Serializer
  attributes :id, :name, :ability_type, :damage, :cooldown, :uses, :effect, :cast, :mana, :duration
end
