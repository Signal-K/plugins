use actix_web::{get, web, App, HttpResponse, HttpServer, Responder};

#[get("/api/plugins")]
async fn get_plugins() -> impl Responder {
    let plugins = vec!["plugin"]
}