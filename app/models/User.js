'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        login: DataTypes.STRING,
        passwordHash: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        role: { type: DataTypes.ENUM, values: ['ADMIN', 'FARMER'] }
    }, {});
    User.associate = function(models) {
        // associations can be defined here
    };
    return User;
};