# Star Sailors Integration Repository

Welcome to the Star Sailors Integration Repository! This repository contains the code for integrating various components of the Star Sailors project, including the Rust API, Ruby API, and Next.js frontend.

## Repository Structure

The repository is organized as follows:

```bash
star-sailors/
│ └── api.rb
│ └── Gemfile
├── src/
│ ├── main.rs
│ └── Cargo.toml
├── frontend/ *submodule
│ ├── pages/
│ │ └── index.tsx
│ └── package.json
│ └── server/
└── README.md
```


- The `src` directory contains the Rust API.
- The `root` directory contains the Ruby API for plugin retrieval and rust config.
- The `frontend` submodule contains a NextJS application that mirrors the DSL Nodes frontend

## Running the APIs

### Rust API

To run the Rust API:

1. Ensure that you have Rust and Cargo installed on your system.
2. Navigate to the `rust-api` directory.
3. Run the following command to build and run the Rust API:

   ```bash
   cargo run
    ```

The Rust API will start running on http://localhost:8080.

### Ruby API
To run the Ruby API:

Ensure that you have Ruby installed on your system.

Navigate to the ruby-api directory.

Install the required dependencies by running:

```bash
bundle install

ruby api.rb
```

# Long-Term Vision
The goal of this repo is to integrate various scientific data analysis and visualization capabilities into an interactive platform -> namely, provide a way to add functionality to your Nodes server. The long-term vision includes:

Enhancing the Rust API to provide additional functionalities and data processing capabilities.
Expanding the Ruby API to support more advanced plugin management and customization options.
Developing additional features and components for the Next.js frontend, such as interactive data visualizations and user collaboration tools.
Integrating the Star Sailors project with the Nodes platform, enabling seamless sharing and collaboration on scientific projects.

# Contributing
Contributions to the Star Sailors Integration Repository are welcome! If you have any ideas, bug reports, or improvements, please open an issue or submit a pull request.