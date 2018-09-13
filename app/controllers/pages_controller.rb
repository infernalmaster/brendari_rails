class PagesController < ApplicationController
  def home
    @projects = Project.order_by(position: :asc)
    render 'projects/index'
  end

  def about
  end

  def contacts
  end
end
