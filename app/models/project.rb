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

  field :seo_title, type: String, localize: true
  field :seo_description, type: String, localize: true

  field :is_text_dark, type: Boolean, default: true
  field :background_color, type: String, default: '#fff'

  mount_uploader :main_image, GridImageUploader

  embeds_many :project_sections, cascade_callbacks: true
  accepts_nested_attributes_for :project_sections

  field :main_image_color, type: String, default: '#ffffff'

  validates :size, inclusion: { in: SIZES }, presence: true
  validates :main_image_color, length: { is: 7 }, presence: true

  validates :background_color, presence: true

  def size_enum
    SIZES
  end

  rails_admin do
    configure :main_image_color, :string
    configure :background_color, :string

    list do
      field :title do
        formatted_value do
          bindings[:object].title
        end
      end
      field :main_image
      field :size
      field :position
      field :created_at
      field :updated_at
    end

    edit do
      exclude_fields :_slugs
      # configure :body do
      #   html_attributes do
      #     {
      #       data: { richeditor: 'medium' },
      #       class: 'rich-text'
      #     }
      #   end
      # end
    end
  end
end
