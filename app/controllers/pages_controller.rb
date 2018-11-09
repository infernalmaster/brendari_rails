class PagesController < ApplicationController
  def home
    @home_photo = HomepagePhoto.random
  end

  def about
    @brendars = Brendar.all.shuffle
  end

  def contacts
  end
end
