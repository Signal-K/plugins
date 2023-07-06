require 'sinatra'
require 'sinatra/cross_origin'
require 'rack/cors'
require 'json'

use Rack::Cors do
    allow do
        origins '*'
        resource '/api/*', headers: :any, methods: :get
    end
end
  
get '/api/plugins' do
    content_type :json
  
    plugins = ['plugin_a', 'plugin_b', 'plugin_c'] # Replace with your actual plugin information
    plugins.to_json
end