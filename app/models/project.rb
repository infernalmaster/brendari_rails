class Project
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Slug

  SIZES = %w[1x1 1x2 2x1 2x2]

  field :title, type: String, localize: true
  slug :title
  field :subtitle, type: String, localize: true
  field :size, type: String, default: SIZES.first
  field :position, type: Integer
  field :body, type: String, localize: true

  mount_uploader :main_image, AssetUploader

  validates :size, inclusion: { in: SIZES }, presence: true

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
      field :main_image
      field :size
      field :created_at
      field :updated_at
    end

    edit do
      exclude_fields :_slugs
      configure :body do
        html_attributes do
          {
            data: { richeditor: 'medium' },
            class: 'rich-text'
          }
        end
      end
    end
  end
end
