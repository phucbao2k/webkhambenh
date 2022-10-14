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
    image: DataTypes.STRING,
    statusId: DataTypes.STRING,
    doctorId: DataTypes.INTEGER,
    patientId: DataTypes.INTEGER,
    plantName: DataTypes.STRING,
    specialtyName: DataTypes.STRING,
    timeType: DataTypes.STRING,
    token: DataTypes.STRING,
    date:
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};