json.extract! user, :id, :name, :lastname, :email, :password, :icon, :type, :created_at, :updated_at
json.url user_url(user, format: :json)
