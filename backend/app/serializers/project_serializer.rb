class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :PlaylistId, :Season, :ProjectNote, :ProjectDateIni, :ProjectDateEnd, :Projectevision
end
