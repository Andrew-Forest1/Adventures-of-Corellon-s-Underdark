class EnemySerializer < ActiveModel::Serializer
  attributes :id, :name, :level, :strength, :agility, :intellect, :vitality, :spirit, :image_url, :abilities

  def abilities
    sorted = self.object.enemy_abilities.sort_by(&:slot)
    sorted.map{ |ability| Ability.find(ability.ability_id)}
  end
end
