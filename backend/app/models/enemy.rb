class Enemy < ApplicationRecord
    include Rails.application.routes.url_helpers
    has_many :enemy_abilities
    has_many :abilities, through: :enemy_abilities

    has_many :dungeon_enemies
    has_many :dungeons, through: :dungeon_enemies

    has_one_attached :image

    def image_url
        rails_blob_url(self.image) if self.image.attached?
    end

    validates :name, uniqueness: true
    validates :name, length: {maximum: 20}
    validates :strength, :agility, :intellect, :vitality, :spirit, numericality: {greater_than: 0}
end
