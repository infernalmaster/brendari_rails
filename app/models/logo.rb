class Logo
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Slug

  SIZES = %w[1x1 2x2]

  field :title, type: String, localize: true
  slug :title
  field :size, type: String
  field :position, type: Integer

  mount_uploader :image_gray, AssetUploader
  mount_uploader :image_colorfull, AssetUploader
  mount_uploader :animation, AssetUploader

  validates :size, inclusion: { in: SIZES }, presence: true
  validates :image_gray, presence: true

  def size_enum
    SIZES
  end

  rails_admin do
    list do
      field :title do
        formatted_value do
          bindings[:object].title
        end
      end
      field :image_gray
      field :size
      field :created_at
      field :updated_at
    end

    edit do
      exclude_fields :_slugs
    end
  end
end
