class Users::SessionsController < Devise::SessionsController
  include RackSessionFix
  respond_to :json

  # Override the set_flash_message method with an empty implementation
  def set_flash_message(key, kind, options = {})
  end

  # Override the set_flash_message! method with an empty implementation
  def set_flash_message!(key, kind, options = {})
  end

  private

  def respond_with(resource, _opts = {})
    Rails.logger.debug("User object: #{resource.inspect}")

    if resource.present?
      render json: {
        status: { code: 200, message: 'Logged in successfully.' },
        data: UserSerializer.new(resource).as_json
      }, status: :ok
    else
      render json: {
        status: 404,
        error: "Not Found",
        message: "User not found."
      }, status: :not_found
    end
  end

  def respond_to_on_destroy
    if current_user
      render json: {
        status: { code: 200, message: 'Logged out successfully' }
      }, status: :ok
    else
      render json: {
        status: 401,
        error: "Unauthorized",
        message: "Couldn't find an active session."
      }, status: :unauthorized
    end
  end
end
