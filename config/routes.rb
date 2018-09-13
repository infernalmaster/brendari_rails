Rails.application.routes.draw do
  devise_for :users

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  scope '/:locale', locale: /en|uk/ do
    get 'about', to: 'pages#about'
    get 'contacts', to: 'pages#contacts'
    resources :projects
    resources :logos

    root to: 'pages#home'
  end

  root to: 'pages#home'
end
