class UserProjectsController < ApplicationController
  before_action :set_user_project, only: %i[show edit update destroy]

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

    respond_to do |format|
      if @user_project.save
        format.html { redirect_to user_project_url(@user_project), notice: 'User project was successfully created.' }
        format.json { render :show, status: :created, location: @user_project }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @user_project.errors, status: :unprocessable_entity }
      end
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
    @user_project.destroy

    respond_to do |format|
      format.html { redirect_to user_projects_url, notice: 'User project was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user_project
    @user_project = UserProject.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def user_project_params
    params.require(:user_project).permit(:user_id, :project_id)
  end
end
