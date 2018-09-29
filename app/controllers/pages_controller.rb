class PagesController < ApplicationController
  def home
    @numbers_of_logos = Logo.count
    @home_photo = HomepagePhoto.random
  end

  def about
  end

  def contacts
  end
end
