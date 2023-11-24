class CreateSchedules < ActiveRecord::Migration[7.1]
  def change
    create_table :schedules do |t|
      t.string :ProjectId
      t.string :Room
      t.string :ScheduleType
      t.string :ScheduleName
      t.string :ScheduleDate
      t.string :ScheduleHourRange
      t.string :ScheduleNote

      t.timestamps
    end
  end
end
