use std::process::Command;
use std::path::Path;
use std::fs;

fn clone_repository(url: &str, destination: &str) {
    let output = Command::new("git")
        .args(&["clone", url, destination])
        .output()
        .expect("Failed to clone repository");

    if output.status.success() {
        println!("Repository cloned successfully: {}", url);
    } else {
        println!("Failed to clone repository: {}", url);
        println!("Error message: {}", String::from_utf8_lossy(&output.stderr));
    }
}

fn main() {
    // Read the configuration file
    let config = fs::read_to_string("plugins.toml").expect("Failed to read configuration file");

    // Parse the configuration file
    let toml: toml::Value = toml::from_str(&config).expect("Failed to parse configuration file");

    // Get the list of plugins to clone
    let plugins = toml
        .get("plugins")
        .and_then(toml::Value::as_array)
        .expect("Failed to read plugins from configuration file");

    // Iterate over the plugins and clone the repositories
    for plugin in plugins {
        if let Some(url) = plugin.get("url").and_then(toml::Value::as_str) {
            if let Some(name) = plugin.get("name").and_then(toml::Value::as_str) {
                let destination = format!("plugins/{}", name);
                clone_repository(url, &destination);

                // Optionally, you can perform additional operations on the cloned repository
                // For example, you can build the plugin crate using Cargo
                let plugin_crate_path = Path::new(&destination);
                if plugin_crate_path.exists() && plugin_crate_path.is_dir() {
                    let build_output = Command::new("cargo")
                        .current_dir(&plugin_crate_path)
                        .args(&["build"])
                        .output()
                        .expect("Failed to build plugin crate");

                    if build_output.status.success() {
                        println!("Plugin crate built successfully: {}", name);
                    } else {
                        println!("Failed to build plugin crate: {}", name);
                        println!("Error message: {}", String::from_utf8_lossy(&build_output.stderr));
                    }
                }
            }
        }
    }
}