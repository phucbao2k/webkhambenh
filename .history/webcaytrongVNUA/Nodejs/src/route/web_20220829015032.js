import express from "express";
import Home from "../controllers/homeController.js";

let router = express.Router();
export function initWebRoutes(app) {
    router.get('/', getHomePage());
    router.get('/', getAboutPage());
        router.get('/', (req, res) =>{
return res.send('HELU WORLD');  
    });
return app.use("/", router);
}
