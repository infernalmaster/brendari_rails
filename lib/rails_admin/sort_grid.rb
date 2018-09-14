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
            @objects ||= list_entries.unscoped.order_by(position: :asc).to_a

            if request.post?
              params['ids'].split(',').each_with_index do |id, index|
                el = @objects.find { |o| o.id.to_s == id }

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

        register_instance_option :pjax? do
          false
        end

        register_instance_option :link_icon do
          'icon-th-large'
        end
      end
    end
  end
end
