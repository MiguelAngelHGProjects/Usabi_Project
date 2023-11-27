class CreateProjects < ActiveRecord::Migration[7.1]
  def change
    create_table :projects do |t|
      t.integer :PlaylistId
      t.string :Season
      t.string :ProjectNote
      t.date :ProjectDateIni
      t.date :ProjectDateEnd
      t.string :Projectevision

      t.timestamps
    end
  end
end
