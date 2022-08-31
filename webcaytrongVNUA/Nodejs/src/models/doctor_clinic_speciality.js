'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Doctor_Clinic_Speciality extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Doctor_Clinic_Speciality.init({
    
    // email: DataTypes.STRING,
    // firstName: DataTypes.STRING,
    // lastName: DataTypes.STRING,
    doctorId: DataTypes.INTEGER,
   clinicID: DataTypes.INTEGER,
    specialityId:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Doctor_Clinic_Speciality',
  });
  return Doctor_Clinic_Speciality;
};