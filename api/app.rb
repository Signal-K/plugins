require 'sinatra'

get '/read' do
    'This is the textual component from the frontend'
end

post '/send' do
    'Cool'
end

if __FILE__ == $0
    run! host: 'localhost', port: 4567
end