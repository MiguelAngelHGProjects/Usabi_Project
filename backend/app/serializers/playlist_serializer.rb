class PlaylistSerializer < ActiveModel::Serializer
  attributes :id, :PlaylistOrder, :WorkAutor, :WorkName, :WorkDuration
end
