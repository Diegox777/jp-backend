'use strict';
const { DataTypes } = require('sequelize');
module.exports = {
  /**
   * @typedef {import('sequelize').Sequelize} Sequelize
   * @typedef {import('sequelize').QueryInterface} QueryInterface
   */

  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns
   */
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('problems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      author: {
        type: DataTypes.STRING
      },
      statement: {
        type: DataTypes.STRING,
        allowNull: false
      },
      input_description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      input_example: {
        type: DataTypes.STRING,
        allowNull: false
      },
      output_description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      output_example: {
        type: DataTypes.STRING,
        allowNull: false
      },
      time_limit: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      memory_limit: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      hints: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('problems');
  }
};