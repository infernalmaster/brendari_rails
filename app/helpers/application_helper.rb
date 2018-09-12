module ApplicationHelper
  def next_locale
    I18n.locale == :uk ? :en : :uk
  end

  def translate_locale(loc)
    loc == :uk ? :ua : loc
  end

  def change_locale_path
    { locale: I18n.locale == :en ? :uk : :en }
  end

  # def lpath(s)
  #   '/'
  # end
end
