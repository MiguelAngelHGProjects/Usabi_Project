class Project < ApplicationRecord
  has_one_attached :projectImage
  has_many :user_projects
  has_many :users, through: :user_projects

  validates :PlaylistId, :Season, :ProjectNote, :Projectrevision, presence: true

  before_validation :split_date_range

  private

  def split_date_range
    return unless projectDateRange.present?

    date_range = projectDateRange.split(' to ')
    self.project_date_ini = Date.parse(date_range[0]) if date_range[0].present?
    self.project_date_end = Date.parse(date_range[1]) if date_range[1].present?
  end
end