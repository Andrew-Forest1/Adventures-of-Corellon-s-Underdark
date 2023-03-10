class DungeonSerializer < ActiveModel::Serializer
  attributes :id, :name, :min_level, :max_level, :description, :enemies, :progresses, :dungeon_enemies

  def enemies
    self.object.enemies.map{|enemy| {name: enemy.name, image_url: enemy.image_url, id:enemy.id, level: enemy.level, strength: enemy.strength, agility: enemy.agility, intellect: enemy.intellect, vitality: enemy.vitality, spirit: enemy.spirit}}
  end
end
