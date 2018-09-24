I18n.backend = I18n::Backend::Chain.new(I18n::Backend::Mongoid.new(TextTranslation), I18n::Backend::Simple.new)

# Where the I18n library should search for translation files
I18n.load_path += Dir[Rails.root.join('lib', 'locale', '*.{rb,yml}')]

# Whitelist locales available for the application
I18n.available_locales = [:en, :uk]

# Set default locale to something other than :en
I18n.default_locale = :uk
