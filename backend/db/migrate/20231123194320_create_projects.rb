  class CreateProjects < ActiveRecord::Migration[7.1]
    def change
      create_table :projects do |t|
        t.references :playlist, foreign_key: true
        t.string :Season
        t.string :ProjectNote
        t.text :projectDateRange
        t.string :Projectrevision
        t.text :projectImage_data

        t.timestamps
      end
    end
  end
