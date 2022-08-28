import express from "express";
import {getHomePage,} from "../controllers/homeController.js";
let router = express.Router();
export function initWebRoutes(app) {
    router.get('/', homeController.getHomePage);
        router.get('/', (req, res) =>{
return res.send('HELU WORLD');  
    });
return app.use("/", router);
}
