import express from "express";

export function  configViewEngine(){
app.use(express.static("./src/public"));
app.set("view engine","ejs","cjs");
app.set("views","./src/views");
}
module.exports = {configViewEngine};