class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable,
         :registerable,
         :jwt_authenticatable,
         jwt_revocation_strategy: self

         has_one_attached :icon

  validates :name, presence: true
  validates :lastname, presence: true
  validates :user_type, presence: true
end
