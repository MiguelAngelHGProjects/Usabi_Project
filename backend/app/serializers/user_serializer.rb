class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :name, :lastname, :email, :user_type, :created_at, :updated_at, :icon_url

  def icon_url
    if object.icon.attached?
      {
        url: rails_blob_url(object.icon)
      }
    end
  end
end