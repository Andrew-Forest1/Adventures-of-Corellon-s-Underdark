class Sprite < ApplicationRecord
  include Rails.application.routes.url_helpers
  belongs_to :user
  has_many :game_object_sprites
  has_many :game_objects, through: :game_object_sprites
  has_one_attached :image

  def image_url
    rails_blob_url(self.image) if self.image.attached?
  end

  validates_presence_of :name, :image, :user_id
end
