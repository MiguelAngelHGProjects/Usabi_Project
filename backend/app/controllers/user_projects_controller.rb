class UserProjectsController < ApplicationController
  before_action :set_user_project, only: %i[show edit update destroy]
  before_action :set_user_project, except: [:usabi_data_index], if: -> { params[:id].present? }
  

  # GET /user_projects or /user_projects.json
  def index
    @user_projects = UserProject.all
    render json: @user_projects
  end

  # GET /user_projects/1 or /user_projects/1.json
  def show
    render json: @user_project
  end

  # GET /user_projects/new
  def new
    @user_project = UserProject.new
    render json: @user_project
  end

  # GET /user_projects/1/edit
  def edit
  end

  # POST /user_projects or /user_projects.json
  def create
    @user_project = UserProject.new(user_project_params)
  
    if @user_project.save
      render json: @user_project, status: :created
    else
      render json: @user_project.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /user_projects/1 or /user_projects/1.json
  def update
    respond_to do |format|
      if @user_project.update(user_project_params)
        format.html { redirect_to user_project_url(@user_project), notice: 'User project was successfully updated.' }
        format.json { render :show, status: :ok, location: @user_project }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @user_project.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /user_projects/1 or /user_projects/1.json
  def destroy
    if @user_project.destroy
      render json: { message: 'UserProject deleted successfully' }, status: :ok
    else
      render json: { error: 'Failed to delete UserProject' }, status: :unprocessable_entity
    end
  end

  def usabi_data_index
    user_project_data = UserProject.includes(:user, :project).group_by do |user_project|
      user_project.user.name
    end.map do |user_name, projects|
      {
        user_name: user_name,
        projects: projects.map { |project| project.project.Season }
      }
    end
  
    render json: { user_project_data: user_project_data }
  end
  
  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user_project
    @user_project = UserProject.find(params[:id])
  end
  
  def set_user_project_for_index
    # No need to find a UserProject here, as usabi_data_index doesn't rely on a specific UserProject
  end

  # Only allow a list of trusted parameters through.
  def user_project_params
    params.require(:user_project).permit(:user_id, :project_id)
  end
end
