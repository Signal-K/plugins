use actix_web::{get, web, App, HttpResponse, HttpServer, Responder};

#[get("/api/plugins")]
async fn get_plugins() -> impl Responder {
    let plugins = vec!["plugin_a", "plugin_b", "plugin_c"]; // Replace with your actual plugin information

    HttpResponse::Ok().json(plugins)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().service(get_plugins))
        .bind("127.0.0.1:8080")? // Replace with your desired address and port
        .run()
        .await
}