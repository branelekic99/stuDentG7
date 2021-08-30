'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Apointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ScheduleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Schedules', key: 'id' }
      },
      startTime: {
        type: Sequelize.BIGINT
      },
      endTime: {
        type: Sequelize.BIGINT
      },
      reserved: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Apointments');
  }
};