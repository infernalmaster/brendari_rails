class Logo
  include Mongoid::Document
  field :title, type: String, localize: true
  field :size, type: String
  field :position, type: Integer

  # ["1x1", "1x1"], ["2x2", "2x2"]

  mount_uploader :image_gray, AssetUploader
  mount_uploader :image_colorfull, AssetUploader
  mount_uploader :animation, AssetUploader
end
