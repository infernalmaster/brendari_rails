class PagesController < ApplicationController
  def home
    @projects = Project.order_by(position: :asc).skip(params.fetch(:skip, 0)).limit(30)

    render 'projects/_items', layout: false if request.xhr?
  end

  def about
  end

  def contacts
  end
end
