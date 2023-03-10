class ConsumableAbilitiesController < ApplicationController
    before_action :find_consumable_ability, only: [:show, :destroy, :update, :image_update]
    skip_before_action :authorized_user

    def create
        consumable_ability = ConsumableAbility.create!(consumable_ability_params)
        render json: consumable_ability, status: :created
    end

    def index
        render json: ConsumableAbility.all, status: :ok
    end

    def show
        render json: @consumable_ability, status: :ok
    end

    def destroy
        @consumable_ability.destroy
        render json: {}, status: :gone
    end

    def update
        @consumable_ability.update!(consumable_ability_params)
        render json: @consumable_ability, status: :accepted
    end

    private

    def consumable_ability_params
        params.permit(:consumable_id, :ability_id)
    end

    def find_consumable_ability
        @consumable_ability = ConsumableAbility.find(params[:id])
    end
end
