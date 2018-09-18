Rails.application.routes.draw do
  devise_for :users

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  post 'article_photos/create'
  post 'article_photos/delete'

  scope '/:locale', locale: /en|uk/ do
    get 'about', to: 'pages#about'
    get 'contacts', to: 'pages#contacts'
    resources :projects
    resources :logos
    resources :posts

    root to: 'pages#home'
  end

  root to: 'pages#home'
  # root to: redirect("/#{I18n.default_locale}", status: 302), as: :redirected_root
end
