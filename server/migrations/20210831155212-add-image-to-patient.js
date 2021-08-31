'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Patients', 
        'imageUrl', 
        {
          type: Sequelize.STRING
        },
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Patients', 'imageUrl')
  }
};
