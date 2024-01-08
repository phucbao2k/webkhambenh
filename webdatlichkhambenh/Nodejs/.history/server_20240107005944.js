const { Op } = require('sequelize');
const { User, Doctor_Infor, Allcode } = require('./src/models');
const { db} = require('./src/models/index.js');
import express from "express";
import bodyParser from "body-parser";
import { configViewEngine } from './src/config/viewEngine.js';
import { initWebRoutes } from './route/web.js';
import {connectDB } from './src/config/connectDB.js';
import cors from 'cors';
const searchFunction = require('./searchFunction');
require('dotenv').config();
let querystring = require('querystring');
// Configure environment variables from .env file
// Create an Express application
let app = express();
let crypto = require('crypto-browserify');
// Use body-parser middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
let order = require('./src/views/order.js');
const searchDoctorAPI = require('./searchDoctorAPI');
// Use CORS middleware
app.use(cors({
    origin: '*',
}));
app.use('/order', order);
app.use('/api', searchDoctorAPI);
app.options('*', cors());
// Configure view engine
configViewEngine(app);

// Initialize web routes
initWebRoutes(app);


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Có thể sửa '*' thành domain cụ thể 
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
}); 
app.post('/api/search-doctor', async (req, res) => {
    const { searchTerm } = req.body;

    const searchCondition = {
        [Op.or]: [
            { 'valueVi': { [Op.like]: `%${searchTerm}%` } },
            { 'valueEn': { [Op.like]: `%${searchTerm}%` } },
        ],
    };

    try {
        const result = await Doctor_Infor.findAll({ where: searchCondition, raw: true });
        res.json(result);
    } catch (error) {
        console.error('Error executing Sequelize query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.post('/api/get-doctors-by-position', async (req, res) => {
    const { searchTerm } = req.body;

    try {
        // Tìm kiếm tất cả các bác sĩ theo giá trị valueVi hoặc valueEn
        const result = await Doctor_Infor.findAll({
            where: {
                [Op.or]: [
                    { valueVi: { [Op.like]: `%${searchTerm}%` } },
                    { valueEn: { [Op.like]: `%${searchTerm}%` } },
                ],
            },
            include: [
                {
                    model: db.Allcode,
                    as: 'priceTypeData',
                    attributes: ['valueEn', 'valueVi']
                },
                {
                    model: db.Allcode,
                    as: 'provinceTypeData',
                    attributes: ['valueEn', 'valueVi']
                },
                {
                    model: db.User,
                    attributes: ['firstName', 'lastName'],
                }
            ],
            attributes: {
                exclude: ['id', 'doctorId']
            },
            raw: true,
        });

        // Ánh xạ các ID sang giá trị tương ứng
        const mappedResult = result.map(doctor => ({
            id: doctor.id,
            valueVi: doctor.valueVi,
            valueEn: doctor.valueEn,
            doctors: doctor,
            priceTypeData: doctor.priceTypeData,
            provinceTypeData: doctor.provinceTypeData,
            firstName: doctor['User.firstName'],
            lastName: doctor['User.lastName'],
        }));

        res.json(mappedResult);
    } catch (error) {
        console.error('Error executing Sequelize query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

connectDB()
    .then(() => {
        let port = process.env.PORT || 7070;

        app.listen(port, () => {
            console.log('Server is running on port ' + port);
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });