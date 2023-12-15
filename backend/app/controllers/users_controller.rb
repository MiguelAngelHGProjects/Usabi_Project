class UsersController < ApplicationController
  before_action :set_user, only: %i[show update destroy]

  def index
    @users = User.all
    render json: {
      status: { code: 200, message: 'Users fetched successfully.' },
      data: ActiveModel::Serializer::CollectionSerializer.new(@users, each_serializer: UserSerializer).as_json
    }, status: :ok
  end

  def show
    render json: {
      status: { code: 200, message: 'User fetched successfully.' },
      data: UserSerializer.new(@user).as_json
    }, status: :ok
  end

  def create
    super do |user|
      token = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil)
      response.headers['Authorization'] = "Bearer #{token}"
      render json: UserSerializer.new(user).as_json.except('token'), status: :ok and return
    end
  end
  
  def update
    if user_params[:password].present?
      update_with_password
    else
      update_without_password
    end
  end

  def updatedata
    if @user.update(user_data_params)
      render_success_response(@user)
    else
      render_error_response(@user)
    end
  end
  
  def destroy
    @user.destroy
    head :no_content
  end
  
  def change_password
    set_user
  
    if @user.valid_password?(password_params[:current_password])
      update_password
    else
      render_unauthorized_response('Current password is incorrect.')
    end
  end

  def update_profile
    if @user.update(user_data_params)
      render_success_response(@user)
    else
      render_error_response(@user)
    end
  end
  
  private
  
  def password_params
    params.permit(:new_password, :password_confirmation)
  end
  
  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:name, :lastname, :email, :password, :icon, :user_type)
  end

  def user_data_params
    params.require(:user).permit(:name, :lastname, :icon)
  end
  
  def update_with_password
    if @user.update_with_password(user_params)
      render_success_response(@user)
    else
      render_error_response(@user)
    end
  end

  def update_without_password
    if @user.update(user_params.except(:password))
      render_success_response(@user)
    else
      render_error_response(@user)
    end
  end

  def update_password
    if @user.update(password: password_params[:new_password], password_confirmation: password_params[:password_confirmation])
      render_success_response(@user)
    else
      render_error_response(@user)
    end
  end

  def render_success_response(user)
    render json: {
      status: { code: 200, message: 'Operation successful.' },
      data: UserSerializer.new(user).as_json
    }, status: :ok
  end

  def render_error_response(user)
    render json: {
      status: 422,
      error: "Unprocessable Entity",
      message: user.errors.full_messages.join(', ')
    }, status: :unprocessable_entity
  end

  def render_unauthorized_response(message)
    render json: {
      status: 401,
      error: "Unauthorized",
      message: message
    }, status: :unauthorized
  end
end
