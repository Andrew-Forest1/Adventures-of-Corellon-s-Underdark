class GameObjectSpritesController < ApplicationController
    def create
        render json: GameObjectSprite.create!(go_sprite_params)
    end

    private

    def go_sprite_params
        params.permit(:sprite_id, :game_object_id)
    end
end
