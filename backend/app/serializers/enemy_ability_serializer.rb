class EnemyAbilitySerializer < ActiveModel::Serializer
  attributes :id, :slot
  has_one :ability
  has_one :enemy
end
