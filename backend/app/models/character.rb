class Character < ApplicationRecord
    include Rails.application.routes.url_helpers
    belongs_to :user
    has_one_attached :image

    has_many :character_abilities
    has_many :abilities, through: :character_abilities

    has_many :character_consumables
    has_many :consumables, through: :character_consumables

    has_many :progresses
    has_many :dungeons, through: :progresses

    def image_url
        rails_blob_url(self.image) if self.image.attached?
    end

    validates_presence_of :user, :name
    validates :name, uniqueness: true
    validates :name, length: {maximum: 20}
    validates :strength, :agility, :intellect, :vitality, :spirit, numericality: {greater_than: 0}
    validates :points, :experience, numericality: {greater_than_or_equal_to: 0}
    validate :max_health
    validate :max_mana
    validate :attribute_points

    def attribute_points
        if level * 3 + 15 != points + strength + agility + intellect + vitality + spirit
            errors.add(:character, "Attribute points don't match character's level")
        end
    end

    def max_health
        if health > 90 + vitality * 10
            errors.add(:character, "health greater than max health")
        end
    end

    def max_mana
        if mana > 90 + spirit * 10
            errors.add(:character, "mana greater than max mana")
        end
    end

    #come back to it
    def level_up
        if experience > 10 * 1.5 ** (level - 1)
            level = level + 1
            points = points + 3
        end
    end
end
