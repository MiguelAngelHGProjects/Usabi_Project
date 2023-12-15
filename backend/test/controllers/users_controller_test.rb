require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

  test "should get index" do
    get users_url, as: :json
    assert_response :success
  end

  test "should create user" do
    assert_difference("User.count") do
      post user_registration_url, params: { 
        user: {
          email: "1@1.com",
          icon: "", 
          lastname: "a", 
          name: "a", 
          password: "1243456", 
          user_type: "admin" 
          }
        }, as: :json
    end

    assert_response :created
  end

  test "should show user" do
    get user_url(@user), as: :json
    assert_response :success
  end

  test "should update user" do
    patch user_url(@user), params: { user: { email: @user.email, icon: '', lastname: @user.lastname, name: @user.name, password: @user.password, user_type: @user.user_type } }, as: :json
    assert_response :success
  end

  test "should destroy user" do
    assert_difference("User.count", -1) do
      delete user_url(@user), as: :json
    end

    assert_response :no_content
  end
end
