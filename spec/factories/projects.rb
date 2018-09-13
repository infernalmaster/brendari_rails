FactoryBot.define do
  factory :project do
    size { Project::SIZES.sample }

    title_translations do
      I18n.available_locales.inject({}) do |hash, locale|
        hash[locale] = Faker::DcComics.hero
        hash
      end
    end

    subtitle_translations do
      I18n.available_locales.inject({}) do |hash, locale|
        hash[locale] = Faker::Lebowski.quote
        hash
      end
    end

    main_image do
      Rack::Test::UploadedFile.new(Rails.root.join('spec', 'support', 'projects', "#{Faker::Number.between(0, 11)}.jpg"),
                                   'image/jpeg')
    end
  end
end
