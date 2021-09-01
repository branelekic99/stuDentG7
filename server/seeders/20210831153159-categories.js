'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [{
      name: 'Popravka zuba i pregled',
      description: '',
      duration: 30,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Liječenje zuba',
      description: '',
      duration: 30,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Mobilna protetika',
      description: '',
      duration: 30,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Fiksna protetika',
      description: '',
      duration: 30,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Ektrakcija zuba',
      description: '',
      duration: 30,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Skidanje kamenca',
      description: '',
      duration: 30,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Djecija stomatologija',
      description: '',
      duration: 30,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Preventivna stomatologija',
      description: '',
      duration: 30,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
