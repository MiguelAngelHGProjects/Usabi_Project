  class CreateProjects < ActiveRecord::Migration[7.1]
    def change
      create_table :projects do |t|
        t.integer :PlaylistId
        t.string :Season
        t.string :ProjectNote
        t.text :projectDateRange
        t.string :Projectrevision
        t.text :projectImage_data

        t.timestamps
      end
    end
  end
