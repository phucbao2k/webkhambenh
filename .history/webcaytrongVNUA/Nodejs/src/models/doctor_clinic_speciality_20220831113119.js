'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class D extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Clinic.init({
    
    // email: DataTypes.STRING,
    // firstName: DataTypes.STRING,
    // lastName: DataTypes.STRING,
    address: DataTypes.STRING,
   description: DataTypes.TEXT,
    image:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Clinic',
  });
  return Clinic;
};