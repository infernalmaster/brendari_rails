class Brendar
  include Mongoid::Document
  field :name, type: String
  field :surname, type: String
  field :title, type: String

  mount_uploader :photo, AssetUploader
end
