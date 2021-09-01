'use strict';
const moment = require('moment');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Patient.Request = Patient.hasMany(models.Request, {foreignKey: {name: "patientId", allowNull: true}});
      Patient.Message = Patient.hasMany(models.Message, {foreignKey: "patientId"});
    }
  };
  Patient.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    phoneNumber: {
      type: DataTypes.STRING
    },
    age: {
      type: DataTypes.INTEGER
    },
    token: {
      type: DataTypes.STRING
    },
    imageUrl: {
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('createdAt')).format("YYYY-MM-DDTHH:mm:ss.sssZ");
      }
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('updatedAt')).format("YYYY-MM-DDTHH:mm:ss.sssZ");
      }
    }
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};