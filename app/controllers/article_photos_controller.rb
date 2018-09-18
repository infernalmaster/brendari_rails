class ArticlePhotosController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :authenticate_user!

  def create
    uploader = ArticlePhotoUploader.new
    uploader.store! params[:files].first

    render json: { files: [
      {
        url: uploader.url
        # , url_mobile: uploader.url(:w420)
      }
    ] }
  end

  def delete
    uploader = ArticlePhotoUploader.new
    uploader.retrieve_from_store!(params[:file].split('/').last)
    uploader.file.delete
    render json: 'ok'
  end
end
