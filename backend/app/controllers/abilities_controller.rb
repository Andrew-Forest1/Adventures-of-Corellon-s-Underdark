class AbilitiesController < ApplicationController
    before_action :find_ability, only: [:show, :destroy, :update, :image_update]
    skip_before_action :authorized_user

    def create
        ability = Ability.create!(ability_params)
        render json: ability, status: :created
    end

    def index
        render json: Ability.all, status: :ok
    end

    def show
        render json: @ability, status: :ok
    end

    def destroy
        @ability.destroy
        render json: {}, status: :gone
    end

    def update
        @ability.update!(ability_params)
        render json: @ability, status: :accepted
    end

    private

    def ability_params
        params.permit(:name, :ability_type, :damage, :cooldown, :uses, :effect, :cast)
    end

    def find_ability
        @ability = Ability.find(params[:id])
    end
end
