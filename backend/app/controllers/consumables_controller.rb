class ConsumablesController < ApplicationController
    before_action :find_consumable, only: [:show, :destroy, :update, :image_update]
    skip_before_action :authorized_user

    def create
        consumable = Consumable.create!(consumable_params)
        render json: consumable, status: :created
    end

    def index
        render json: Consumable.all, status: :ok
    end

    def show
        render json: @consumable, status: :ok
    end

    def destroy
        @consumable.destroy
        render json: {}, status: :gone
    end

    def update
        @consumable.update!(consumable_params)
        render json: @consumable, status: :accepted
    end

    private

    def consumable_params
        params.permit(:name)
    end

    def find_consumable
        @consumable = Consumable.find(params[:id])
    end
end
