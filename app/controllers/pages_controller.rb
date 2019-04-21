class PagesController < ApplicationController
  def home
    @brendars = Brendar.all.shuffle
    @projects = Project.order_by(position: :asc).limit(10)
    @logos = Logo.order_by(position: :asc).limit(10)
  end

  def about
    @brendars = Brendar.all.shuffle
  end

  def contacts
  end
end
