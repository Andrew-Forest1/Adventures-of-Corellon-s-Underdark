class DungeonEnemiesController < ApplicationController
    before_action :find_dungeon_enemy, only: [:show, :destroy, :update]

    skip_before_action :authorized_user

    def index
        render json: DungeonEnemy.all, status: :ok
    end

    def show
        render json: @dungeon_enemy, status: :ok
    end

    def create 
        DungeonEnemy.create!(dungeon_enemies_params)
        render json: Enemy.find(params[:enemy_id]), status: :created
    end

    def destroy
        @dungeon_enemy.destroy
        render json: Enemy.find(params[:enemy_id]), status: :ok
    end

    def update
        # enemy = @dungeon_enemies[0].update!(dungeon_enemies_params)
        # render json: character, status: :accepted
    end

    private

    def find_dungeon_enemy
        @dungeon_enemy = DungeonEnemy.find(params[:id])
    end

    # def find_dungeon_enemies
    #     @dungeon_enemies = DungeonEnemy.where('character_id = ? AND ability_id = ?', params[:character_id], params[:ability_id])
    # end

    def dungeon_enemies_params
        params.permit(:enemy_id, :dungeon_id)
    end
end
