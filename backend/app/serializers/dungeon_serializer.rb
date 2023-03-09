class DungeonSerializer < ActiveModel::Serializer
  attributes :id, :name, :min_level, :max_level, :description, :enemies, :progresses, :dungeon_enemies
end
