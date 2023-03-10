class SessionsController < ApplicationController
    skip_before_action :authorized_user, only: [:login]

    def login
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            #binding.break
            session[:user_id] = user.id
            render json: user, status: :ok
        else
            render json: {error: "Incorrect username or password."}, status: 451
        end
    end

    def logout
        #binding.break
        session.delete :user_id
        head :no_content
    end

    def character_select
        character = Character.find(params[:id])
        if character
            session[:character_id] = character.id
            render json: character, status: :ok
        else
            render json: {error: "Invalid Character"}, status: :not_found
        end
    end

    def show_character
        if session[:character_id]
            render json: Character.find(session[:character_id]), status: :ok
        else
            render json: {}, status: :ok
        end
    end

    def character_deselect
        session.delete :character_id
        head :no_content
    end
end
