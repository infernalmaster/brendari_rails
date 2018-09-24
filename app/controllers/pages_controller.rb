class PagesController < ApplicationController
  def home
    @numbers_of_logos = Logo.count
    random_project_id = Project.collection.aggregate([{'$sample': { size: 1 }}]).first['_id']
    @project_image = Project.find(random_project_id).main_image_url
  end

  def about
  end

  def contacts
  end
end
