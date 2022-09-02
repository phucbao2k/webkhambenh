import express from "express";
import homeController from "../controllers/homeController.js";

let router = express.Router();
export function initWebRoutes(app) {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
     router.post('/put-crud', homeController.putCRUD);
     router.post('/put-crud', homeController.putCRUD);
    router.get('/', (req, res) => {
        return res.send('HELU WORLD');
    });
    return app.use("/", router);
}
