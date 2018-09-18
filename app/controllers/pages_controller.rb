class PagesController < ApplicationController
  def home
    @projects = Project.order_by(position: :asc).skip(params.fetch(:skip, 0)).limit(30)
    if request.xhr?
      render 'projects/_items', layout: false
    else
      render 'projects/index'
    end
  end

  def about
  end

  def contacts
  end
end
