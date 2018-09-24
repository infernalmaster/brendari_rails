require Rails.root.join('lib', 'rails_admin', 'sort_grid.rb')
RailsAdmin::Config::Actions.register(RailsAdmin::Config::Actions::SortGrid)

RailsAdmin.config do |config|
  ### Popular gems integration

  # == Devise ==
  config.authenticate_with do
    I18n.locale = :en
    warden.authenticate! scope: :user
  end
  config.current_user_method(&:current_user)

  ## == Cancan ==
  # config.authorize_with :cancan

  ## == Pundit ==
  # config.authorize_with :pundit

  ## == PaperTrail ==
  # config.audit_with :paper_trail, 'User', 'PaperTrail::Version' # PaperTrail >= 3.0.0

  ### More at https://github.com/sferik/rails_admin/wiki/Base-configuration

  ## == Gravatar integration ==
  ## To disable Gravatar integration in Navigation Bar set to false
  # config.show_gravatar = true

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new do
      except ['SiteConfig', 'TextTranslation']
    end
    export
    bulk_delete
    show
    edit
    delete do
      except ['SiteConfig', 'TextTranslation']
    end
    show_in_app

    sort_grid

    ## With an audit adapter, you can add:
    # history_index
    # history_show
  end

  # FIX
  config.excluded_models += [
    'App::Models::Mongoid::GridFs',
    'App::Models::Mongoid::GridFs::Fs::Chunk',
    'App::Models::Mongoid::GridFs::Fs::File',
    'Mongoid-gridFs',
    'Mongoid::GridFs::Version'
  ]
end
