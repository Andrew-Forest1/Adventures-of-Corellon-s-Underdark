class GameObjectAnimationsController < ApplicationController
    def create 
        render json: GameObjectAnimation.create!(go_animation_params), status: :created
    end

    private

    def go_animation_params
        params.permit(:game_object_id, :animation_id)
    end
end
