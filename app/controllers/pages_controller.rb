class PagesController < ApplicationController
  def home
    @numbers_of_logos = Logo.count
  end

  def about
  end

  def contacts
  end
end
