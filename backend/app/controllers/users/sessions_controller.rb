# app/controllers/users/sessions_controller.rb

class Users::SessionsController < Devise::SessionsController
  include RackSessionFix
  include ActionController::HttpAuthentication::Basic
  respond_to :json
  before_action :authenticate_user!, only: [:destroy]

  def create
    user = User.find_by(email: params[:user][:email])

    if user && user.valid_password?(params[:user][:password])
      sign_in(user)
      render json: {
        status: 'success',
        data: UserSerializer.new(user).as_json,
        token: request.env['warden-jwt_auth.token']
      }
    else
      render json: {
        status: 'error',
        message: 'Invalid credentials'
      }, status: :unauthorized
    end
  end

  def destroy
    if user_signed_in?
      sign_out(current_user)
      render json: {
        status: 'success',
        message: 'Logged out successfully.'
      }
    else
      render json: {
        status: 'error',
        message: 'Couldn\'t find an active session.'
      }, status: :unauthorized
    end
  end

  private

  def respond_with(resource, _opts = {})
    if resource.present?
      render json: {
        status: { code: 200, message: 'Logged in successfully.' },
        data: UserSerializer.new(resource).as_json,
        token: request.env["warden-jwt_auth.token"],
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
