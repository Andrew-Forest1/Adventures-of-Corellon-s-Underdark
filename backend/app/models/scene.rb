class Scene < ApplicationRecord
  include Rails.application.routes.url_helpers
  belongs_to :user
  has_many :game_objects
  has_one_attached :bimage

  validates_presence_of :name
  validates :name, uniqueness: { scope: :user_id }

  def background
    rails_blob_url(self.bimage) if self.bimage.attached?
  end
end
