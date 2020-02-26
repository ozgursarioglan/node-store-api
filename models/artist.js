const sequelize = require("../database/sequelize")
const Sequelize = require("sequelize");

module.exports = sequelize.define('artist', {
    id: {
        field: 'ArtistId',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        field: 'Name',
        type: Sequelize.STRING
    }
}, {
    timestamps: false
});