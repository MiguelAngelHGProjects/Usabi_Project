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
    @user = User.new(user_params)

    if @user.save
      render json: {
        status: { code: 201, message: 'User created successfully.' },
        data: UserSerializer.new(@user).as_json
      }, status: :created
    else
      render json: {
        status: 422,
        error: "Unprocessable Entity",
        message: @user.errors.full_messages.join(', ')
      }, status: :unprocessable_entity
    end
  end

  def update
    if @user.update(user_params)
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
    @user.destroy
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
