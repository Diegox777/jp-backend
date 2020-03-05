const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    return sequelize.define('user', {
        nick: {
            type: DataTypes.STRING,
            allowNull: false,
            trim: true,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            trim: true,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('basic', 'admin', 'supervisor'),
            defaultValue: 'basic'
        },
        accessToken: {
            type: DataTypes.STRING
        }
    });
}