'use strict';
const moment = require('moment');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Message.Patient = Message.belongsTo(models.Patient, {foreignKey: "patientId"});
      Message.Admin = Message.belongsTo(models.Admin, {foreignKey: "adminId"});
      Message.Request = Message.belongsTo(models.Request, {foreignKey: "requestId"});
    }
  };
  Message.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    requestId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Requests', key: 'id' }
    },
    message: {
      type: DataTypes.STRING
    },
    patientId: {
      type: DataTypes.INTEGER,
      references: { model: 'Patients', key: 'id' }
    },
    adminId: {
      type: DataTypes.INTEGER,
      references: { model: 'Admins', key: 'id' }
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
    modelName: 'Message',
  });
  return Message;
};