class AnimationsController < ApplicationController
    def index
        render json: Animation.all, status: :ok
    end

    def create
        render json: Animation.create!(animation_params), status: :created
    end

    private

    def animation_params 
        params.permit(:name)
    end
end
