'use strict';
module.exports = (sequelize, DataTypes) => {
  const problem = sequelize.define('problem', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    acs: DataTypes.INTEGER,
    tries: DataTypes.INTEGER
  }, {});
  problem.associate = function(models) {
    // associations can be defined here
  };
  return problem;
};