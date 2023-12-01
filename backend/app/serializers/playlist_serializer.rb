class PlaylistSerializer < ActiveModel::Serializer
  attributes :id, :PlaylistOrder, :ProjectId, :WorkAutor, :WorkName, :WorkDuration, :PlaylistString
end
