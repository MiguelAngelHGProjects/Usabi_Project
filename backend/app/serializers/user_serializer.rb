class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :lastname, :email, :icon, :user_type, :created_at, :updated_at
end
