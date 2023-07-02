use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};

#[get("/read")]
async fn read() -> impl Responder {
    HttpResponse::Ok().body("First textual component on the frontend")
}

#[post("/send")]
async fn send(text: web::Json<String>) -> impl Responder {
    HttpResponse::Ok().body("Cool")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().service(read).service(send))
        .bind("127.0.0.1:8000")?
        .run()
        .await
}