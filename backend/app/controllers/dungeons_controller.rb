class DungeonsController < ApplicationController
    before_action :find_dungeon, only: [:show, :destroy, :update]

    def create
        dungeon = Dungeon.create!(dungeon_params)
        render json: dungeon, status: :created
    end

    def index
        render json: Dungeon.all, status: :ok
    end

    def show
        render json: @dungeon, status: :ok
    end

    def destroy
        @dungeon.destroy
        render json: {}, status: :ok
    end

    def update
        @dungeon.update!(dungeon_params)
        render json: @dungeon, status: :accepted
    end

    private

    def dungeon_params
        params.permit(:name, :min_level, :max_level, :description)
    end

    def find_dungeon
        @dungeon = Dungeon.find(params[:id])
    end
end
