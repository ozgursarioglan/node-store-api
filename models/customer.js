const sequelize = require("../database/sequelize");
const Sequelize = require("sequelize");

module.exports = sequelize.define('customer', {
    id: {
        field: 'CustomerId',
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    FirstName: {
        field: 'FirstName',
        type: Sequelize.STRING
    },
    LastName: {
        field: 'LastName',
        type: Sequelize.STRING
    },
    Company: {
        field: 'Company',
        type: Sequelize.STRING
    },
    Address: {
        field: 'Address',
        type: Sequelize.STRING
    },
    City: {
        field: 'City',
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false
});