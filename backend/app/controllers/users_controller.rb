class UsersController < ApplicationController
    before_action :find_user, only: [:destroy]
    skip_before_action :authorized_user, only: [:create]

    def index
        render json: User.all, status: :ok
    end

    def create
        render json: User.create!(user_params), status: :created
    end

    def show
        render json: @user, status: :ok
    end

    def destroy
        @user.destroy
        head :no_content
    end

    private

    def find_user
        @user = User.find(params[:id])
    end

    def user_params
        params.permit(:username, :password, :email)
    end
end