Rails.application.routes.draw do
  resources :progresses
  resources :dungeon_enemies
  resources :dungeons
  resources :character_consumables
  resources :consumable_abilities
  resources :consumables
  resources :enemy_abilities
  resources :enemies
  resources :character_abilities
  resources :abilities
  resources :characters
  resources :users

  post "/login", to: "sessions#login"
  delete "/logout", to: "sessions#logout"
  get '/authorized_user', to: 'users#show'
  put '/characterimage', to: 'characters#image_update'
  put '/enemyimage', to: 'enemies#image_update'
  post "/select_character", to: "sessions#character_select"
  delete "/deselect_character", to: "sessions#character_deselect"
  get "/selected_character", to: "sessions#show_character"
  post "/dnd", to: "dnd#dnd"
  put "/dnd", to: "dnd#show"
end
