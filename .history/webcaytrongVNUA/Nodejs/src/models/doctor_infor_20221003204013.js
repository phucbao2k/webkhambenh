'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
    class Doctor_Infor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
           
        }
    };
   Doctor_Infor.init({
        doctorId: DataTypes.INTEGER,
        priceId: DataTypes.STRING,
        provinceId: DataTypes.STRING,
        payment: DataTypes.STRING,
        address: DataTypes.STRING,
        phoneNumber: DataTypes.TEXT,
        gender: DataTypes.STRING,
        image: DataTypes.STRING,
        roleId: DataTypes.STRING,
        positionId: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Doctor_Infor',
    });
    return Doctor_Infor;
};