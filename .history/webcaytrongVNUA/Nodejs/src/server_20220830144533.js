import express from "express";
import bodyParser from "body-parser";
import {configViewEngine} from "./config/viewEngine.js";
import {initWebRoutes}  from './route/web.js';
import connectDB from "./config/connectDB";
require ('dotenv').config();
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
configViewEngine(app);
initWebRoutes(app);
co
let port = process.env.PORT || 7070;
//if port is undefined, default to current 7070
app.listen(port,()=>{
    //callback
console.log("port is " + port);
})
