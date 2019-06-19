class Logo
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Slug

  field :title, type: String, localize: true
  slug :title
  field :position, type: Integer

  belongs_to :project, inverse_of: nil, optional: true

  mount_uploader :image_gray, GridImageUploader
  mount_uploader :image_colorfull, GridImageUploader
  mount_uploader :animation, AssetUploader

  validates :image_gray, presence: true

  scope :sorted, -> { order_by(position: :asc, created_at: :desc) }

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

      configure :image_gray do
        help 'svg, png or jpg file. Aspect ratio 3x2'
      end

      configure :image_colorfull do
        help 'svg, png or jpg file. Aspect ratio 3x2'
      end

      configure :animation do
        help 'mp4 file. Aspect ratio 3x2'
      end
    end
  end
end
