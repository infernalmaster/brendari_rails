class PagesController < ApplicationController
  def home
    @numbers_of_logos = Logo.count
    @project_image = HomepagePhoto.random.try(:image_url)
  end

  def about
  end

  def contacts
  end
end
