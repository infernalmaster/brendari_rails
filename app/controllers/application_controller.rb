class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :set_locale
  before_action :disbale_layout_if_barbajs

  def set_locale
    I18n.locale = params[:locale] || extract_locale_from_accept_language_header || I18n.default_locale
  end

  def extract_locale_from_accept_language_header
    request.env['HTTP_ACCEPT_LANGUAGE'].scan(/^[a-z]{2}/).first
  end

  def default_url_options
    { locale: I18n.locale }
  end

  def disbale_layout_if_barbajs
    if request.headers['x-barba'].present?
      self.class.layout 'barbajs'
    else
      self.class.layout 'application'
    end
  end
end
