class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :name, :lastname, :email, :user_type, :created_at, :updated_at, :icon

  def icon
    if object.icon.attached?
      rails_blob_url(object.icon)
    end
  end
end
