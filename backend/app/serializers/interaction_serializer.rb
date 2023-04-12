class InteractionSerializer < ActiveModel::Serializer
  attributes :id, :event, :contents
  has_one :game_object
end
