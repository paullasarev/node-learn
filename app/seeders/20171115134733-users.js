'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'John Doe',
        login: 'john',
        email: 'john@example.com',
        password: 'asdf',
        createdAt: '2016-03-31T08:00:10.354Z',
        updatedAt: '2016-03-31T08:00:10.354Z',
      },
      {
        name: 'Nick Smith',
        login: 'nick',
        email: 'nick@example.com',
        password: 'asdf',
        createdAt: '2016-03-31T08:00:10.354Z',
        updatedAt: '2016-03-31T08:00:10.354Z',
      },
      {
        name: 'Barbara Lewis',
        login: 'barbara',
        email: 'barbara@example.com',
        password: 'asdf',
        createdAt: '2016-03-31T08:00:10.354Z',
        updatedAt: '2016-03-31T08:00:10.354Z',
      }
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
