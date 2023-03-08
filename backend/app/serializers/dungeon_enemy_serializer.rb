class DungeonEnemySerializer < ActiveModel::Serializer
  attributes :id
  has_one :enemy
  has_one :dungeon
end
