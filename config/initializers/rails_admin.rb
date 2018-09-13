# somewhere in your lib/ directory:

# require 'rails_admin/config/actions'
# require 'rails_admin/config/actions/base'

module RailsAdmin
  module Config
    module Actions
      class SortGrid < RailsAdmin::Config::Actions::Base
        # This ensures the action only shows up for Users
        register_instance_option :collection do
          true
        end

        register_instance_option :http_methods do
          [:get, :post]
        end

        register_instance_option :controller do
          proc do
            @objects ||= list_entries.unscoped.order_by(position: :asc)

            if request.post?
              params["ids"].split(",").each_with_index do |id, index|
                el = @objects.find do |obj|
                  obj.id.to_s == id
                end

                if el.present?
                  el.position = index
                  el.save
                end
              end

              render json: { status: 'success' }
            else
              render @action.template_name
            end
          end
        end

        register_instance_option :bulkable? do
          true
        end

        # TODO: disable turbolink

        register_instance_option :link_icon do
          'icon-share'
        end
      end
    end
  end
end
RailsAdmin::Config::Actions.register(RailsAdmin::Config::Actions::SortGrid)


RailsAdmin.config do |config|

  ### Popular gems integration

  # == Devise ==
  config.authenticate_with do
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
    new
    export
    bulk_delete
    show
    edit
    delete
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
