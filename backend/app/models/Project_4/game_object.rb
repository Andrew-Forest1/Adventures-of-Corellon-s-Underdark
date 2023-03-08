class GameObject < ApplicationRecord
    belongs_to :scene
    
    has_one :game_object_sprite
    has_one :sprite, through: :game_object_sprite

    has_many :game_object_animations
    has_many :animations, through: :game_object_animations

    validates_presence_of :x_pos, :y_pos, :rotation, :w_scale, :h_scale
    validates :x_pos, :y_pos, :rotation, :w_scale, :h_scale, numericality: true
    validates :shape, inclusion: { in: ['rectangle', 'circle', 'triangle'], message: "%{value} is not a rectangle, circle, or triangle" }
end
