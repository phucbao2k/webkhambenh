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
        contentMarkdown: DataTypes.TEXT('long'),
        description: DataTypes.TEXT('long'),
        doctorId: DataTypes.INTEGER,
        specialityId: DataTypes.INTEGER,
        clinicID: DataTypes.INTEGER,
    },{
        sequelize,
        mo
    })
}