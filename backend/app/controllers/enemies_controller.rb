class EnemiesController < ApplicationController
    before_action :find_enemy, only: [:show, :destroy, :update, :image_update]

    def create
        enemy = Enemy.create!(name: enemy_params[:name], level: 1, strength: 1, agility: 1, intellect: 1, vitality: 1, spirit: 1)
        render json: enemy, status: :created
    end

    def index
        render json: Enemy.all, status: :ok
    end

    def show
        render json: @enemy, status: :ok
    end

    def destroy
        @enemy.destroy
        render json: {}, status: :gone
    end

    def update
        @enemy.update!(update_enemy_params)
        render json: @enemy, status: :accepted
    end

    def image_update
        binding.break
        @enemy.update!(image: params[:image])
        render json: @enemy, status: :accepted
    end


    private

    def enemy_params
        params.permit(:name, :level, :strength, :agility, :intellect, :vitality, :spirit, :image_url)
    end

    def update_enemy_params
        params.permit(:level, :strength, :agility, :intellect, :vitality, :spirit)
    end

    def find_enemy
        @enemy = Enemy.find(params[:id])
    end
end
