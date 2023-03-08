class ProgressesController < ApplicationController
    before_action :find_progress, only: [:show, :destroy, :update]

    skip_before_action :authorized_user

    def create
        progress = Progress.create!(progress_params)
        render json: progress, status: :created
    end

    def index
        render json: Progress.all, status: :ok
    end

    def show
        render json: @progress, status: :ok
    end

    def destroy
        @progress.destroy
        render json: {}, status: :gone
    end

    def update
        @progress.update!(progress_params)
        render json: @progress, status: :accepted
    end

    private

    def progress_params
        params.permit(:character_id, :dungeon_id, :enemy_id)
    end

    def find_progress
        @progress = Progress.find(params[:id])
    end
end
