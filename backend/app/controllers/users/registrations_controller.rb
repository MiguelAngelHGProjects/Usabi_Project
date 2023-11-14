# app/controllers/users/registrations_controller.rb
class Users::RegistrationsController < Devise::RegistrationsController
  include RackSessionFix
  respond_to :json

  def create
    build_resource(sign_up_params)

    if resource.save
      yield resource if block_given?
      respond_with_resource(resource, 'Signed up successfully.')
    else
      clean_up_passwords resource
      set_minimum_password_length
      respond_with_errors(resource.errors)
    end
  end

  private

  def sign_up_params
    params.require(:user).permit(:name, :lastname, :email, :password, :password_confirmation, :icon, :user_type)
  end

  def respond_with_resource(resource, message)
    if resource.persisted?
      render json: {
        status: { code: 201, message: message },
        data: UserSerializer.new(resource).as_json
      }, status: :created
    else
      respond_with_errors(resource.errors)
    end
  end
  

  def respond_with_errors(errors)
    render json: {
      status: { code: 422, message: 'Unprocessable Entity' },
      errors: errors.full_messages
    }, status: :unprocessable_entity
  end
end
