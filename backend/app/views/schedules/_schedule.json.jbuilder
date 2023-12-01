json.extract! schedule, :id, :ProjectId, :Room, :ScheduleType, :ScheduleName, :ScheduleDate, :ScheduleHourRange, :ScheduleNote, :created_at, :updated_at
json.url schedule_url(schedule, format: :json)
