import express from "express";

let router = express.Router();
export function initWebRoutes(app) {
    router.get('/', (req, res) =>{
return res.send('HELU WORLD');  
    });
return app.use("/", router);
}
