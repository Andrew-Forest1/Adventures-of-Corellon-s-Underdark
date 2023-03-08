class User < ApplicationRecord
    has_many :characters
    has_secure_password

    validates_presence_of :username, :email, :password
    validates :password, length: {minimum: 6}
    validates :username, uniqueness: true
    validates :email, uniqueness: true
end
