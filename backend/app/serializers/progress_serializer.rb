class ProgressSerializer < ActiveModel::Serializer
  attributes :id
  has_one :character
  has_one :dungeon
  has_one :enemy
end
