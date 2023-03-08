class DndController < ApplicationController
    skip_before_action :authorized_user

    def dnd
        @response =  RestClient.get "http://www.dnd5eapi.co/api/#{params[:route]}",
        {content_type: :json, accept: :json}

        render json: @response.body
    end

    def show
        @response =  RestClient.get "http://www.dnd5eapi.co#{params[:route]}",
        {content_type: :json, accept: :json}

        render json: @response.body
    end

end