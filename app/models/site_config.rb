class SiteConfig
  include Mongoid::Document

  field :key, type: String
  field :value, type: String

  def self.get(key)
    store = RequestStore.store[:site_config] ||= all.to_a

    store.find { |el| el.key == key.to_s }.try(:value)
  end

  rails_admin do
    edit do
      configure :key do
        read_only true
      end
    end
  end
end
