
require('dotenv').config();
module.exports = {
    "development": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE_NAME,
        "host": process.env.DB_HOST,
        "port": process.env.DB_PORT,
        "dialect": process.env.DB_DIALECT,
        "define": {
            "freezeTableName": true
        },
        dialectOptions:
           {}
        ,
        "timezone": "+07:00"
    },
    "test": {
        "username": "admin",
        "password": "phuccnttc63",
        "database": "datlichenkham",
        "host": "database-webkltn.c18sqym6wh15.ap-southeast-1.rds.amazonaws.com",
        "dialect": "mysql"
    },
    "production": {
        "username": "admin",
        "password": "phuccnttc63",
        "database": "datlichenkham",
        "host": "database-webkltn.c18sqym6wh15.ap-southeast-1.rds.amazonaws.com",
        "dialect": "mysql"
    }
};