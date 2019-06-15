class PagesController < ApplicationController
  def home
    @brendars = Brendar.all.shuffle
    @projects = Project.sorted.limit(5)
    @logos = Logo.sorted.limit(5).includes(:project)
  end

  def about
    @brendars = Brendar.all.shuffle
  end

  def contacts
  end
end
