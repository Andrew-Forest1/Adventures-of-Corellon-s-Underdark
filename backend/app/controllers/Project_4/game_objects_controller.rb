class GameObjectsController < ApplicationController
    before_action :find_game_object, only: [:destroy, :update]

    def index 
        render json: GameObject.all, status: :ok
    end

    def create
        go = GameObject.create!(go_params)
        render json: go, status: :created
    end

    def destroy
        @game_object.destroy
        render json: {}, status: :gone
    end

    def update
        @game_object.update(go_params)
        render json: @game_object, status: :accepted
    end

    private

    def go_params
        params.permit(:scene_id, :x_pos, :y_pos, :rotation, :w_scale, :h_scale, :shape)
    end

    def find_game_object
        @game_object = GameObject.find(params[:id])
    end
end
