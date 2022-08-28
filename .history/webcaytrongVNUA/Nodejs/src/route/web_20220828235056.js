import express from "express";
import {getAboutPage,getHomePage} from "../controllers/homeController.js";

let router = express.Router();
export function initWebRoutes(app) {
    router.get('/', homecontroller.getHomePage());
    router.get('/', getAboutPage());
        router.get('/', (req, res) =>{
return res.send('HELU WORLD');  
    });
return app.use("/", router);
}
