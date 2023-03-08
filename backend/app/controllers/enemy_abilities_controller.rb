class EnemyAbilitiesController < ApplicationController
    before_action :find_enemy_abilities, only: [:show, :destroy, :update]

    def index
        render json: EnemyAbility.all, status: :ok
    end

    def show
        render json: @enemy_ability[0], status: :ok
    end

    def create 
        EnemyAbility.create!(enemy_ability_params)
        render json: Enemy.find(params[:enemy_id]), status: :created
    end

    def destroy
        @enemy_ability[0].destroy
        render json: Enemy.find(params[:enemy_id]), status: :ok
    end

    def update
        enemy = @enemy_ability[0].update!(enemy_ability_params)
        render json: enemy, status: :accepted
    end

    private

    def find_enemy_abilities
        @enemy_ability = EnemyAbility.where('enemy_id = ? AND ability_id = ?', params[:enemy_id], params[:ability_id])
    end

    def enemy_ability_params
        params.permit(:enemy_id, :ability_id, :slot)
    end
end
