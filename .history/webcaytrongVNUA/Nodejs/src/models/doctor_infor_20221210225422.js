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
            Doctor_Infor.belongsTo(models.User, { foreignKey: 'doctorId' });
            Doctor_Infor.belongsTo(models.Allcode, { foreignKey: 'paymentId', targetKey: 'keyMap', as: 'paymentTypeData' });
            Doctor_Infor.belongsTo(models.Allcode, { foreignKey: 'provinceId', targetKey: 'keyMap', as: 'provinceTypeData' });
            Doctor_Infor.belongsTo(models.Allcode, { foreignKey: 'priceId', targetKey: 'keyMap', as: 'priceTypeData' });
            .belongsTo(models.User, {  });
            Doctor_Infor.belongsTo(models.User,
                { foreignKey: 'phoneNumber', targetKey: 'phone', as: 'doctorData' })
        }
    };
    Doctor_Infor.init({
        doctorId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,
        priceId: DataTypes.STRING,
        provinceId: DataTypes.STRING,
        paymentId: DataTypes.STRING,
        addressClinic: DataTypes.STRING,
        nameClinic: DataTypes.STRING,
        note: DataTypes.STRING,
        count: DataTypes.STRING,
phoneNumber: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Doctor_Infor',
    });
    return Doctor_Infor;
};