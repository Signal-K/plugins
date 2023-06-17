use std::fs;
use serde::Deserialize;

#[derive(Deserialize)]
struct PluginConfig {
    url: String,
    destination: String,
}

fn clone_repository(url: &str, destination: &str) {
    let output = std::process::Command::new("git")
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
    let plugins: Vec<PluginConfig> = toml::from_str(&config).expect("Failed to parse configuration file");

    // Iterate over the plugins and clone the repositories
    for plugin in plugins {
        clone_repository(&plugin.url, &plugin.destination);
    }
}