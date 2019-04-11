class Logo
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Slug

  field :title, type: String, localize: true
  slug :title
  field :position, type: Integer

  mount_uploader :image_gray, AssetUploader
  mount_uploader :image_colorfull, AssetUploader
  mount_uploader :animation, AssetUploader

  validates :image_gray, presence: true

  rails_admin do
    list do
      field :title do
        formatted_value do
          bindings[:object].title
        end
      end
      field :image_gray
      field :position
      field :created_at
      field :updated_at
    end

    edit do
      exclude_fields :_slugs
    end
  end
end
