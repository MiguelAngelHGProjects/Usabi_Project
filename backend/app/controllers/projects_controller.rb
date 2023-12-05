class ProjectsController < ApplicationController
  before_action :set_project, only: %i[show edit update destroy]
  include Rails.application.routes.url_helpers

  # GET /projects or /projects.json
  def index
    @projects = Project.all
    render json: @projects
  end

  # GET /projects/1 or /projects/1.json
  def show
    render json: project_response_data(@project)
  end

  # GET /projects/new
  def new
    @project = Project.new
  end

  # GET /projects/1/edit
  def edit
  end

  # POST /projects or /projects.json
  def create
    @project = Project.new(project_params)
    parse_date_range_params

    if @project.save
      render json: project_response_data(@project), status: :created
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /projects/1 or /projects/1.json
  def update
    Rails.logger.debug "Params received: #{params.inspect}"
  
    if @project.update(project_params)
      purge_project_image_if_needed
      attach_project_image
      render json: project_response_data(@project), status: :ok, location: @project
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end 

  # DELETE /projects/1 or /projects/1.json
  def destroy
    if @project.destroy
      render json: { message: 'Project deleted successfully' }, status: :ok
    else
      render json: { error: 'Failed to delete project' }, status: :unprocessable_entity
    end
  end

  private

  def project_response_data(project)
    {
      id: project.id,
      PlaylistId: project.PlaylistId,
      Season: project.Season,
      ProjectNote: project.ProjectNote,
      project_date_ini: project.project_date_ini&.strftime('%Y-%m-%d'),
      project_date_end: project.project_date_end&.strftime('%Y-%m-%d'),
      Projectrevision: project.Projectrevision,
      projectDateRange: date_range_string(project),
      projectImage_data: project_image_data(project)
    }
  end

  def date_range_string(project)
    return unless project.project_date_ini && project.project_date_end

    "#{project.project_date_ini.strftime('%Y-%m-%d')} to #{project.project_date_end.strftime('%Y-%m-%d')}"
  end

  def project_image_data(project)
    return {} unless project.projectImage.attached?

    {
      url: url_for(project.projectImage),
      filename: project.projectImage.filename.to_s,
      content_type: project.projectImage.content_type,
      size: project.projectImage.byte_size,
      created_at: project.projectImage.created_at
    }
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_project
    @project = Project.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def project_params
    params.require(:project).permit(:PlaylistId, :Season, :ProjectNote, :Projectrevision, :projectImage, :projectDateRange)
  end

  def parse_date_range_params
    if params[:projectDateRange].present?
      date_range_parts = params[:projectDateRange].split(' to ')
      # Validar que ambos extremos del rango estén presentes antes de asignar
      @project.project_date_ini = date_range_parts[0].present? ? Date.parse(date_range_parts[0]) : nil
      @project.project_date_end = date_range_parts[1].present? ? Date.parse(date_range_parts[1]) : nil
    end
  end

  def purge_project_image_if_needed
    @project.projectImage.purge if params.dig(:project, :projectImage, :purge) == '1'
  end

  def attach_project_image
    if params[:project][:projectImage].present?
      @project.projectImage.attach(params[:project][:projectImage])
    end
  end
end
