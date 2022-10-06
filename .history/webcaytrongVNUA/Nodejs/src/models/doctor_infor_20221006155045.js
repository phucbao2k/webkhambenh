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
           Doctor_Infor.belongsTo(models.User, {foreignKey: 'doctorId'});
           Doctor_Infor.belongsTo(models.Allcode,{foreignKey: 'priceId'});
        }
    };
   Doctor_Infor.init({
        doctorId: DataTypes.INTEGER,
        priceId: DataTypes.STRING,
        provinceId: DataTypes.STRING,
        paymentId: DataTypes.STRING,
        addressClinic: DataTypes.STRING,
        nameClinic: DataTypes.STRING,
        note: DataTypes.STRING,
        count: DataTypes.STRING,
        
    }, {
        sequelize,
        modelName: 'Doctor_Infor',
        freezeTableName: true
    });
    return Doctor_Infor;
};