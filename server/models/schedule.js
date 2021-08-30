'use strict';
const moment = require('moment'); 
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Schedule.Category = Schedule.belongsTo(models.Category, {foreignKey: "categoryId"});
      Schedule.Apointment = Schedule.hasMany(models.Apointment, {foreignKey: "ScheduleId"});
    }
  };
  Schedule.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    categoryId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Categories', key: 'id' }
    },
    startTime: {
      type: DataTypes.INTEGER,
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
    modelName: 'Schedule',
  });
  return Schedule;
};

