class EnemyAbility < ApplicationRecord
  belongs_to :ability
  belongs_to :enemy
end
