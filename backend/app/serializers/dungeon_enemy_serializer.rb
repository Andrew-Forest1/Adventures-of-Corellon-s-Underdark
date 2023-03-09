class DungeonEnemySerializer < ActiveModel::Serializer
  attributes :id, :progresses
  has_one :enemy
  has_one :dungeon
end
