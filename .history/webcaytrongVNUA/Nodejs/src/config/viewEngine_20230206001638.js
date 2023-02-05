import express from "express";
export function configViewEngine(app) {
    app.use(express.static("./src/public"));
    app.set("view engine", "ejs", "cjs","pug");
    app.set("views", "./src/views");
}
//