'use strict';
/**
 * @typedef { import('sequelize').Sequelize } Sequelize
 * @typedef { import('sequelize').DataTypes } DataTypes
 */

/**
 * @param {Sequelize} sequelize
 * @param {DataTypes} DataTypes
 * @returns {Model} Model
 */
module.exports = (sequelize, DataTypes) => {
  const problem = sequelize.define('problem', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    statement: DataTypes.STRING,
    input_description: DataTypes.STRING,
    input_example: DataTypes.STRING,
    output_description: DataTypes.STRING,
    output_example: DataTypes.STRING,
    time_limit: DataTypes.INTEGER,
    memory_limit: DataTypes.INTEGER,
    hints: DataTypes.INTEGER
  }, {});
  problem.associate = function(models) {
    // associations can be defined here
  };
  return problem;
};