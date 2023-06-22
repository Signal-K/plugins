require 'yaml'

config = YAML.load_file('plugins.yml') # Read the config file to determine what plugins are being requested
plugins = config['plugins']

plugins.each do |plugin|
    case plugin
    when 'plugin_a'
        PluginA.initialise # use the plugin
    when 'plugin_b'
        PluginB.initialise # use the plugin
    else
        puts "Unknown plugin: #{plugin}"    
    end
end

module PluginA
    def self.initialise
        puts "Initialising plugin A"
    end
end

module PluginB
    def self.initialise
        puts "Initialising plugin B"
    end
end