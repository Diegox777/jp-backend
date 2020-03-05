const Sequelize = require('sequelize');
const UserModel = require('./models/user');
const ProblemModel = require('./models/problem');

const sequelize = new Sequelize('jp', 'diegox', 'holabola', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const User = UserModel(sequelize);
const Problem = ProblemModel(sequelize);

sequelize.sync({ force: true })
    .then(() => {
        console.log('Tables created!');
    });

module.exports = {
    User,
    Problem
}