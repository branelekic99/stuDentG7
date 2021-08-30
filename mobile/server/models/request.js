'use strict';
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
      Request.Patient = Request.belongsTo(models.Patient);
      Request.Apoitment = Request.belongsTo(models.Apointment);
      Request.Message = Request.hasMany(models.Message);
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
      allowNull: false,
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
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Request',
  });
  return Request;
};