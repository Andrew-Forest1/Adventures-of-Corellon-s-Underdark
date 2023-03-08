class CharacterAbilitiesController < ApplicationController
    before_action :find_character_abilities, only: [:show, :destroy, :update]

    def index
        render json: CharacterAbility.all, status: :ok
    end

    def show
        render json: @character_ability[0], status: :ok
    end

    def create 
        CharacterAbility.create!(character_ability_params)
        render json: Character.find(params[:character_id]), status: :created
    end

    def destroy
        @character_ability[0].destroy
        render json: Character.find(params[:character_id]), status: :ok
    end

    def update
        character = @character_ability[0].update!(character_ability_params)
        render json: character, status: :accepted
    end

    private

    def find_character_abilities
        @character_ability = CharacterAbility.where('character_id = ? AND ability_id = ?', params[:character_id], params[:ability_id])
    end

    def character_ability_params
        params.permit(:character_id, :ability_id, :slot)
    end
end
