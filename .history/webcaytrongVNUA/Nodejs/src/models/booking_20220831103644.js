'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Booking.init({
    
    statusId: DataTypes.STRING,
    doctorId: DataTypes.INTEGER,
    patient: DataTypes.INTEGER,
    date: DataTypes.STRING,
    timeType: DataTypes.BOOLEAN,
    roleid:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};