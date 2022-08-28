import express from "express";
import {getHomePage} from "../controllers/homeController.js";

let router = express.Router();
export function initWebRoutes(app) {
    console.log(get)
    // router.get('/', homeController.getHomePage());
    router.get('/', getHomePage);
    // router.get('/', HomeController.getAboutPage());
    router.get('/', (req, res) => {
        return res.send('HELU WORLD');
    });
    return app.use("/", router);
}
