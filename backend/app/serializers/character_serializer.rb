class CharacterSerializer < ActiveModel::Serializer
  attributes :id, :name, :level, :experience, :points, :strength, :agility, :intellect, :vitality, :spirit, :image_url, :abilities, :progresses, :health, :mana, :gold, :consumables
  has_one :user

  def consumables
    self.object.consumables.map{|consumable| {id: consumable.id, amount: self.object.character_consumables.find{|c| c.consumable_id == consumable.id && c.character_id == self.object.id}.amount, name: consumable.name, abilities: consumable.abilities}}
  end

  #amount: self.object.character_consumables.find{|consumable| consumable.consumable_id == consumable.id && consumable.character_id == self.object.id}.amount,

  # def amount(consumable)
  #   self.object.character_consumables.find{|consumable| consumable.consumable_id == consumable.id && consumable.character_id == self.object.id}
  # end
end
