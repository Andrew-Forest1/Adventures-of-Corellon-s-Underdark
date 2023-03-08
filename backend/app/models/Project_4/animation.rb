class Animation < ApplicationRecord
    has_many :game_object_animations
    has_many :game_objects, through: :game_object_animations
end
