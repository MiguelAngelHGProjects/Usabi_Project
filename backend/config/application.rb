require_relative "boot"
require "rails/all"

Bundler.require(*Rails.groups)

module Backend
  class Application < Rails::Application
    config.load_defaults 7.1
    config.autoload_lib(ignore: %w(assets tasks))

    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'http://localhost:3000'
        resource '*', headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head]
      end
    end    

    config.api_only = false

    config.session_store :cookie_store, key: 'a441b0c01d8316e27fd17ed20d94717889456aefdf7929488582f7d0fcdda17105df9d729adf1961f9dde25ffbfe0166111d79e2bbed2bac7c256c40cbfad897'
  end
end
