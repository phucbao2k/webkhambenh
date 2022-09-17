import express from "express";
import bodyParser from "body-parser";
import {configViewEngine} from "./config/viewEngine.js";
import {initWebRoutes}  from './route/web.js';
import connectDB from "./config/connectDB.js";
import cors from 'cors';
require ('dotenv').config();
let app = express();
app.use(cors({origin: true}));
app.use(bodyParser.json({limit: ''}));
app.use(bodyParser.urlencoded({ extended: true }));
configViewEngine(app);
initWebRoutes(app);
connectDB();
let port = process.env.PORT || 7070;
//if port is undefined, default to current 7070
app.listen(port,()=>{
    //callback
console.log("port is " + port);
})
