class CurrentUserController < ApplicationController
  before_action :authenticate_user!

  def index
    if current_user
      render json: {
        status: { code: 200, message: 'User data retrieved successfully.' },
        data: {
          id: current_user.id,
          name: current_user.name,
          lastname: current_user.lastname,
          email: current_user.email,
          icon: current_user.icon,
          user_type: current_user.user_type
        }
      }, status: :ok
    else
      render json: { error: 'User not found.' }, status: :not_found
    end
  end
end
