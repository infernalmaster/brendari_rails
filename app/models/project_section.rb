class ProjectSection
  include Mongoid::Document

  TYPES = %w[
    text_one_column
    text_two_columns
    video
    image_one_column
    image_multi_column_1-1-1-1
    image_multi_column_2-2
    image_multi_column_1-1-2
    image_multi_column_1-2-1
    image_multi_column_2-1-1
  ]

  field :type, type: String, default: TYPES.first

  field :position, type: Integer

  field :text, type: String, localize: true

  # maybe just upload full video to site then pase url there
  # or  maybe upload banner first
  field :video_url, type: String
  # html = url.replace(/\n?/g, '')
  #   .replace(/^((http(s)?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|v\/)?)([a-zA-Z0-9\-_]+)(.*)?$/, '<div class="video video-youtube"><iframe width="420" height="315" src="//www.youtube.com/embed/$7" frameborder="0" allowfullscreen></iframe></div>')
  #   .replace(/^https?:\/\/vimeo\.com(\/.+)?\/([0-9]+)$/, '<div class="video video-vimeo"><iframe src="//player.vimeo.com/video/$2" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>')

  # <div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.2493%;">
  #   <iframe src="https://www.youtube.com/embed/au2rDBKBMbM?rel=0" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" allowfullscreen="" scrolling="no" allow="autoplay; encrypted-media"></iframe>
  # </div>

  # https://developers.google.com/youtube/player_parameters?hl=ru

  # TODO: image gallery

  mount_uploader :image1, AssetUploader
  mount_uploader :image2, AssetUploader
  mount_uploader :image3, AssetUploader
  mount_uploader :image4, AssetUploader

  embedded_in :project

  def type_enum
    TYPES
  end

  rails_admin do
    configure :video_url, :string

    edit do
      # exclude_fields :_slugs
      configure :text do
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
