Rails.application.routes.draw do
  resources :playlists
  resources :schedules
  resources :projects

  # Devise routes
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  }, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  # Current user route
  get '/current_user', to: 'current_user#index'

  resources :users, only: [:index, :show, :destroy] do
    member do
      put 'change_password'
      put 'update_profile'
    end    
  end
  
  resources :user_projects, only: [:index, :show, :new, :create, :edit, :update, :destroy] do
    collection do
      get 'usabi_data', action: 'usabi_data_index'
    end
  end
  
end
