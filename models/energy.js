const sequelize = require("../database/sequelize");
const Sequelize = require("sequelize");

module.exports = sequelize.define('energy_use', {
    id: {
        field: 'id',
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    creation_datetime: {
        field: 'creation_datetime',
        type: Sequelize.DATE
    },
    creation_date: {
        field: 'creation_date',
        type: Sequelize.DATEONLY
    },
    creation_time: {
        field: 'creation_time',
        type: Sequelize.TIME
    },
    power: {
        field: 'power',
        type: Sequelize.INTEGER
    },
    power_kw: {
        field: 'power_kw',
        type: Sequelize.INTEGER
    },
    slave: {
        field: 'slave',
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false
});