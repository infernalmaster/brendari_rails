FactoryBot.define do
  factory :logo do
    size { Logo::SIZES.sample }

    title_translations do
      I18n.available_locales.inject({}) do |hash, locale|
        hash[locale] = Faker::Company.name
        hash
      end
    end

    image_gray do
      Rack::Test::UploadedFile.new(Rails.root.join('spec', 'support', 'logos', "#{Faker::Number.between(0, 123)}.jpg"),
                                   'image/jpeg')
    end

    # image_colorfull do
    #   Rack::Test::UploadedFile.new(Rails.root.join('spec', 'support', 'FF4D00-0.8.png'),
    #                                'image/jpeg')
    # end

    # animation do
    #   Rack::Test::UploadedFile.new(Rails.root.join('spec', 'support', 'FF4D00-0.8.png'),
    #                                'image/jpeg')
    # end
  end
end
