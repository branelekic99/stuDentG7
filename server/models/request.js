'use strict';
const moment = require('moment');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Request.Patient = Request.belongsTo(models.Patient, {foreignKey: {name: "patientId", allowNull: true}});
      Request.Apoitment = Request.belongsTo(models.Apointment, {foreignKey: "apointmentId"});
      Request.Message = Request.hasMany(models.Message, {foreignKey: "requestId"});
    }
  };
  Request.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    patientId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: { model: 'Patients', key: 'id' }
    },
    apointmentId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Apointments', key: 'id' }
    },
    description: {
      type: DataTypes.STRING
    },
    approved: {
      type: DataTypes.BOOLEAN,
      default: false
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
    modelName: 'Request',
  });
  return Request;
};