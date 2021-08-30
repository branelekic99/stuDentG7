'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Admins', 
        'token', 
        {
          type: Sequelize.STRING
        },
      ),
      queryInterface.addColumn(
        'Patients', 
        'token', 
        {
          type: Sequelize.STRING
        },
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Admins', 'token'),
    queryInterface.removeColumn('Patients', 'token')
  }
};
