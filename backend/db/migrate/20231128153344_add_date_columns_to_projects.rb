class AddDateColumnsToProjects < ActiveRecord::Migration[7.1]
  def change
    add_column :projects, :project_date_ini, :date
    add_column :projects, :project_date_end, :date
  end
end
  