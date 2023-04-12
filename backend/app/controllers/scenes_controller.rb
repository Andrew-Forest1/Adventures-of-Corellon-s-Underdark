class ScenesController < ApplicationController
    require 'uri'
    before_action :find_scene, only:[:show, :destroy, :update, :background_update]
    skip_before_action :authorized_user

    def index
        render json: Scene.all, status: :ok
    end

    def show
        render json: @scene.game_objects, status: :ok
    end

    def update
        @scene.update!(scene_params)
        render json: @scene, status: :ok
    end

    def background_update
        # file = URI.open(params[:image])
        # filename = File.basename(URI.parse(params[:image]).path)
        # @scene.image.attach(io: file, filename: filename)
        # render json: @scene, status: :accepted
        # rescue URI::InvalidURIError
            @scene.update!(bimage: params[:image])
            render json: @scene, status: :accepted
    end

    def create
        scene = Scene.create!(scene_params)
        render json: scene, status: :created
    end

    def destroy
        @scene.destroy
        render json: {}, status: :gone
    end

    private

    def find_scene
        @scene = Scene.find(params[:id])
    end

    def scene_params
        params.permit(:name, :user_id, :image)
    end

    # def image_params
    #     params.permit(:image)
    # end

    # def single_scene
    #     {id: @scene.id, name: @scene.name, user: @scene.user, game_objects: @scene.game_objects}
    # end
end
