require 'sinatra'
require 'json'

get '/api/plugins' do
    content_type :json

    plugins = ['plugin_a']
    plugins.to_json
end