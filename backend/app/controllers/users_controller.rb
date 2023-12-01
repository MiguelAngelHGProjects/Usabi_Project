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
    if user_params[:password].present? && !@user.update_with_password(user_params)
      render json: {
        status: 422,
        error: "Unprocessable Entity",
        message: @user.errors.full_messages.join(', ')
      }, status: :unprocessable_entity
    elsif @user.update(user_params.except(:password))
      render json: {
        status: { code: 200, message: 'User updated successfully.' },
        data: UserSerializer.new(@user).as_json
      }, status: :ok
    else
      render json: {
        status: 422,
        error: "Unprocessable Entity",
        message: @user.errors.full_messages.join(', ')
      }, status: :unprocessable_entity
    end
  end
  

  def destroy
    user = User.find(params[:id])
    user.destroy
    head :no_content
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:name, :lastname, :email, :password, :icon, :user_type)
  end
end
