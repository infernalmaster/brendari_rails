class Post
  include Mongoid::Document
  field :title, type: String, localize: true
  field :body, type: String, localize: true

  rails_admin do
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
