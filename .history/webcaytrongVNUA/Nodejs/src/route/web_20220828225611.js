import express from "express";
import getHomePage from "../controllers/homeController.js";
import getAboutPage from "../controllers/homeController.js";
let router = express.Router();
export function initWebRoutes(app) {
    router.get('/', homeCgetHomePage());
    router.get('/', homeCgetAboutPage());
        router.get('/', (req, res) =>{
return res.send('HELU WORLD');  
    });
return app.use("/", router);
}
