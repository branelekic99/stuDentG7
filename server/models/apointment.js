'use strict';
const moment = require('moment');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Apointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Apointment.Schedule = Apointment.belongsTo(models.Schedule, {foreignKey: "ScheduleId"});
      Apointment.Request = Apointment.hasMany(models.Request, {foreignKey: "apointmentId"});
    }
  };
  Apointment.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    ScheduleId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Schedules', key: 'id' }
    },
    startTime: {
      type: DataTypes.BIGINT,
      get() {
        const storedValue = this.getDataValue('startTime');
        return new Date(new Number(storedValue)).toISOString();
      }
    },
    endTime: {
      type: DataTypes.BIGINT,
      get() {
        const storedValue = this.getDataValue('endTime');
        return new Date(new Number(storedValue)).toISOString();
      }
    },
    reserved: {
      type: DataTypes.BOOLEAN
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
    modelName: 'Apointment',
  });
  return Apointment;
};