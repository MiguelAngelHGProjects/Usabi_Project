class CurrentUserController < ApplicationController
  before_action :authenticate_user!

  def index
    if current_user
      user_data = {
        id: current_user.id,
        name: current_user.name,
        lastname: current_user.lastname,
        email: current_user.email,
        user_type: current_user.user_type
      }

      user_data[:icon] = rails_blob_url(current_user.icon) if current_user.icon.attached?

      render json: {
        status: { code: 200, message: 'User data retrieved successfully.' },
        data: user_data
      }, status: :ok
    else
      render json: { error: 'User not found.' }, status: :not_found
    end
  end
end
