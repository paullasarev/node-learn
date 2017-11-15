'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        name: 'table',
        description: 'table',
        price: '100',
        createdAt: '2016-03-31T08:00:10.354Z',
        updatedAt: '2016-03-31T08:00:10.354Z',
      },
      {
        name: 'bed',
        description: 'bed',
        price: '200',
        createdAt: '2016-03-31T08:00:10.354Z',
        updatedAt: '2016-03-31T08:00:10.354Z',
      },
      {
        name: 'shelve',
        description: 'shelve',
        price: '300',
        createdAt: '2016-03-31T08:00:10.354Z',
        updatedAt: '2016-03-31T08:00:10.354Z',
      },
  ], {});
  /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
