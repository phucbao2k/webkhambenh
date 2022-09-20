'use strict';
const{
    Model
} = require('Sequelize');
module.exports =(sequelize, DataTypes)=>{
    class Markdown extends Model{
        static associate(models){

        }
    };
    Markdown.init({
        contentHTML: DataTypes.TEXT('long'),
    })
}