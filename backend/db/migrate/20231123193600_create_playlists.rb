class CreatePlaylists < ActiveRecord::Migration[7.1]
  def change
    create_table :playlists do |t|
      t.integer :PlaylistOrder
      t.string :WorkAutor
      t.string :WorkName
      t.integer :WorkDuration

      t.timestamps
    end
  end
end
