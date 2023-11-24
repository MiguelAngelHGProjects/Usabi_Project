class CreateProjects < ActiveRecord::Migration[7.1]
  def change
    create_table :projects do |t|
      t.string :PlaylistId
      t.string :Season
      t.string :ProjectNote
      t.string :ProjectDateIni
      t.string :ProjectDateEnd
      t.string :Projectevision

      t.timestamps
    end
  end
end
