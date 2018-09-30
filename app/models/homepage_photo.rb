class HomepagePhoto
  include Mongoid::Document

  mount_uploader :image, AssetUploader

  validates :image, presence: true

  def self.random
    random_project_hash = collection.aggregate([{ '$sample': { size: 1 } }]).first

    return nil if random_project_hash.blank?

    find(random_project_hash['_id'])
  end
end
