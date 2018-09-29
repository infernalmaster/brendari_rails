require "openssl"
require "base64"

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

  # RESIZE:
  # fit - resizes the image while keeping aspect ratio to fit given size;
  # fill - resizes the image while keeping aspect ratio to fill given size and cropping projecting parts;
  # crop - crops the image to a given size.
  # GRAVITY:
  # no - north (top edge);
  # so - south (bottom edge);
  # ea - east (right edge);
  # we - west (left edge);
  # ce - center;
  # sm - smart. libvips detects the most "interesting" section of the image and considers it as the center of the resulting image.
  # EXTENSIONS: jpg, png, webp, original
  def resize(url, width: 300,
                  height: 300,
                  resize: 'fill',
                  gravity: 'ce',
                  enlarge: false,
                  extension: 'original')

    return url unless Rails.env.production?

    key = [ENV['IMGPROXY_KEY']].pack('H*')
    salt = [ENV['IMGPROXY_SALT']].pack('H*')

    encoded_url = Base64.urlsafe_encode64("#{request.base_url}#{url}")
                        .tr('=', '').scan(/.{1,16}/).join('/')

    enlarge = (enlarge ? 1 : 0)
    extension = url.split('.').last.downcase if extension == 'original'

    path = "/#{resize}/#{width}/#{height}/#{gravity}/#{enlarge}/#{encoded_url}.#{extension}"

    digest = OpenSSL::Digest.new('sha256')
    hmac = Base64.urlsafe_encode64(OpenSSL::HMAC.digest(digest, key, "#{salt}#{path}")).tr('=', '')

    "/imgproxy/#{hmac}#{path}"
  end
end
