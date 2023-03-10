class ProgressSerializer < ActiveModel::Serializer
  attributes :id, :character_id, :dungeon_id, :dungeon_enemy_id
  # has_one :character
  # has_one :dungeon
  # has_one :dungeon_enemy
end
