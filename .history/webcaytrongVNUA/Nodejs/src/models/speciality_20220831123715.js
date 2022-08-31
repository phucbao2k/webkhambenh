'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Speciality extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Speciality.init({
    name: D
    description: DataTypes.TEXT,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Speciality',
  });
  return Speciality;
};