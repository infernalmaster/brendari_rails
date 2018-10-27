class PagesController < ApplicationController
  def home
    @home_photo = HomepagePhoto.random
  end

  def about
  end

  def contacts
  end
end
