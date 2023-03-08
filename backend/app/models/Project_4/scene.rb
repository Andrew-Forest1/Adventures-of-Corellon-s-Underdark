class Scene < ApplicationRecord
  belongs_to :user
  has_many :game_objects

  validates_presence_of :name
  validates :name, uniqueness: { scope: :user_id }
end
