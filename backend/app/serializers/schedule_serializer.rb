class ScheduleSerializer < ActiveModel::Serializer
  attributes :id, :ProjectId, :Room, :ScheduleType, :ScheduleName, :ScheduleDate, :ScheduleHourRange, :ScheduleNote
end
