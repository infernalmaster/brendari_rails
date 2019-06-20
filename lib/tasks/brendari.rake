namespace :brendari do
  desc "create seeds for logos"
  task logos_seeds: :environment do
    (0..123).each do |i|
      Logo.create!(
        size: Logo::SIZES.sample,
        image_gray: Rack::Test::UploadedFile.new(Rails.root.join('spec', 'support', 'logos', "#{i}.jpg"), 'image/jpeg')
      )
    end
  end

  desc "create seeds for projects"
  task projects_seeds: :environment do
    (0..10).each do |i|
      Project.create!(
        title: 'Awesome Project',
        subtitle: 'Some awesome',
        size: Project::SIZES.sample,
        main_image: Rack::Test::UploadedFile.new(Rails.root.join('spec', 'support', 'projects', "#{i}.jpg"), 'image/jpeg')
      )
    end
  end

  desc "create seeds for configs"
  task configs_seeds: :environment do
    SiteConfig.delete_all
    SiteConfig.create(key: 'fb:app_id', value: '')
    SiteConfig.create(key: 'GMAPS_API_KEY', value: '')
    SiteConfig.create(key: 'brief_link', value: '')
    SiteConfig.create(key: 'presentation_link', value: '')
    SiteConfig.create(key: 'phone', value: '067 998-87-27')
    SiteConfig.create(key: 'fb', value: 'https://www.facebook.com/brendari.agency')
    SiteConfig.create(key: 'instagram', value: 'https://www.instagram.com/brendari.agency/')
    SiteConfig.create(key: 'dribble', value: 'https://dribbble.com/brendari')
    SiteConfig.create(key: 'behance', value: 'https://www.behance.net/brendari-agency')
  end

  desc "create admin user"
  task user_seeds: :environment do
    User.create!(email: 'q@q.q', password: '111111', password_confirmation: '111111')
  end

  desc "recreate image versions"
  task recreate_image_versions: :environment do
    Logo.all.each { |l| l.image_gray.recreate_versions! if l.image_gray.present? }
    Logo.all.each { |l| l.image_colorfull.recreate_versions! if l.image_colorfull.present? }
    Project.all.each do |p|
      if p.main_image.present?
        p p.main_image_url
        p.main_image.recreate_versions!
      end
    end
  end
end
