class InteractionsController < ApplicationController
    before_action :find_interaction, only: [:show, :destroy, :update]
    #skip_before_action :authorized_user

    def create
        interaction = Interaction.create!(interaction_params)
        render json: GameObject.find(params[:game_object_id]), status: :created
    end

    def index
        render json: Interaction.all, status: :ok
    end

    def show
        render json: @interaction, status: :ok
    end

    def destroy
        @interaction.destroy
        render json: {}, status: :ok
    end

    def update
        @interaction.update!(interaction_params)
        render json: GameObject.find(params[:game_object_id]), status: :accepted
    end

    private

    def interaction_params
        params.permit(:game_object_id, :event, :content)
    end

    def find_interaction
        @interaction = Interaction.find(params[:id])
    end
end
