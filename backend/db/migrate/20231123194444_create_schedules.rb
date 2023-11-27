class CreateSchedules < ActiveRecord::Migration[7.1]
  def change
    create_table :schedules do |t|
      t.integer :ProjectId
      t.string :Room
      t.string :ScheduleType
      t.string :ScheduleName
      t.date :ScheduleDate
      t.integer :ScheduleHourRange
      t.string :ScheduleNote

      t.timestamps
    end
  end
end
