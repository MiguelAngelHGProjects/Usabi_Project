class CreatePlaylists < ActiveRecord::Migration[7.1]
  def change
    create_table :playlists do |t|
      t.string :PlaylistOrder
      t.string :ProjectId
      t.string :WorkAutor
      t.string :WorkName
      t.string :WorkDuration
      t.string :PlaylistString

      t.timestamps
    end
  end
end
