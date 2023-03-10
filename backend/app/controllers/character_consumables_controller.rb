class CharacterConsumablesController < ApplicationController
    before_action :find_character_consumable, only: [:show, :destroy, :update, :image_update]
    skip_before_action :authorized_user

    def create
        character_consumable = CharacterConsumable.create!(character_consumable_params)
        render json: character_consumable, status: :created
    end

    def index
        render json: CharacterConsumable.all, status: :ok
    end

    def show
        render json: @character_consumable, status: :ok
    end

    def destroy
        @character_consumable.destroy
        render json: {}, status: :gone
    end

    def update
        @character_consumable.update!(character_consumable_params)
        render json: @character_consumable, status: :accepted
    end

    private

    def character_consumable_params
        params.permit(:consumable_id, :ability_id)
    end

    def find_character_consumable
        @character_consumable = CharacterConsumable.find(params[:id])
    end
end
