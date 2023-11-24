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

  # Users resource routes
  resources :users, only: [:index, :show, :destroy]
end
