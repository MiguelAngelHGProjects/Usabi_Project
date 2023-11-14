class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :lastname
      t.string :email
      t.string :password
      t.string :icon
      t.string :user_type

      t.timestamps
    end
  end
end
