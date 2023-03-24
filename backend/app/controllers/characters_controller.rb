class CharactersController < ApplicationController
    before_action :find_character, only: [:show, :destroy, :update, :image_update]
    #skip_before_action :authorized_user

    def create
        character = Character.create!(user_id: character_params[:user_id], name: character_params[:name], level: 1, experience: 0, points: 13, strength: 1, agility: 1, intellect:1, vitality: 1, spirit: 1, health: 100, gold: 0)
        render json: character, status: :created
    end

    def index
        render json: Character.all, status: :ok
    end

    def show
        render json: @character, status: :ok
    end

    def destroy
        @character.destroy
        render json: {}, status: :ok
    end

    def update
        @character.update!(update_character_params)
        render json: @character, status: :accepted
    end

    def image_update
        file = URI.open(params[:image])
        filename = File.basename(URI.parse(params[:image]).path)
        @character.image.attach(io: file, filename: filename)
        render json: @character, status: :accepted
        rescue URI::InvalidURIError
        @character.update!(image: params[:image])
        render json: @character, status: :accepted
    end

    private

    def character_params
        params.permit(:user_id, :name, :level, :experience, :points, :strength, :agility, :intellect, :vitality, :spirit, :image_url)
    end

    def update_character_params
        params.permit(:level, :experience, :points, :strength, :agility, :intellect, :vitality, :spirit, :health, :mana, :gold)
    end

    def find_character
        @character = Character.find(params[:id])
    end
end
