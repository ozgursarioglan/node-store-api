const sequelize = require("../database/sequelize");
const Sequelize = require("sequelize");

module.exports = sequelize.define('user', {
    id: {
        field: "id",
        type: Sequelize.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING
    }
}, {
    timestamps: true
});