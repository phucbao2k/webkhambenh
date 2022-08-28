import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from './route/web';
require('dotenv').config;
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
viewEngine(app);
initWebRoutes(app);
let port = process.env.PORT || 7070;
//if port is undefined, default to current 7070
app.listeners(port,()=>{
    //callback
console.log("port is" + port);
})