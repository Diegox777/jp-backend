'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const n = 87;
    const problems = [];
    for (let i = 0; i < n; i++) {
      const problem = {
        title: faker.commerce.product(),
        author: faker.name.firstName() + ' ' + faker.name.lastName(),
        acs: faker.random.number({ min: 1, max: 500 }),
        tries: faker.random.number({ min: 1, max: 500 }),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      problems.push(problem);
    }
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
      return queryInterface.bulkInsert('problems', problems, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('problems', null, {});
  }
};
