class ProjectSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :playlist_id, :Season, :ProjectNote, :project_date_ini, :project_date_end, :Projectrevision, :projectDateRange, :projectImage_data

  def project_date_ini
    object.project_date_ini&.strftime('%Y-%m-%d')
  end

  def project_date_end
    object.project_date_end&.strftime('%Y-%m-%d')
  end

  def projectDateRange
    "#{project_date_ini} to #{project_date_end}"
  end

  def projectImage_data
    if object.projectImage.attached?
      {
        url: rails_blob_url(object.projectImage),
        filename: object.projectImage.filename.to_s,
        content_type: object.projectImage.content_type,
        size: object.projectImage.byte_size,
        created_at: object.projectImage.created_at
      }
    else
      {
        message: "Project image not attached."
      }
    end
  end
end
