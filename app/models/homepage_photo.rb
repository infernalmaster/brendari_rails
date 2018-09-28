class HomepagePhoto
  include Mongoid::Document

  mount_uploader :image, AssetUploader

  validates :image, presence: true

  def self.random
    random_id = collection.aggregate([{ '$sample': { size: 1 } }]).first['_id']
    find(random_id)
  end
end
