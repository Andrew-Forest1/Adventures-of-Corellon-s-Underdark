class SingleSceneSerializer < ActiveModel::Serializer
  attributes :id, :name, :game_objects
  has_one :user
  #has_many :game_objects

  def game_objects
    object.game_objects
    #object.game_objects.map{|go| go.sprite}
  end
end
