import express from "express";
import HomeController from "../controllers/homeController.js";

let router = express.Router();
export function initWebRoutes(app) {
    router.get('/', HomeController.getHomePage());
    router.get('/', getAboutPage());
        router.get('/', (req, res) =>{
return res.send('HELU WORLD');  
    });
return app.use("/", router);
}
