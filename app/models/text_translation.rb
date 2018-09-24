class TextTranslation
  include Mongoid::Document
  include I18nBackendMongoid::Translateble

  store_in collection: 'i18n'

  rails_admin do
    edit do
      configure :key do
        read_only true
      end
    end
  end
end
