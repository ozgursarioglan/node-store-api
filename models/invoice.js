const sequelize = require("../database/sequelize")
const Sequelize = require("sequelize");

module.exports = sequelize.define('invoice', {
    id: {
        field: 'InvoiceId',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    customerId: {
        field: 'CustomerId',
        type: Sequelize.INTEGER
    },
    invoiceDate: {
        field: 'InvoiceDate',
        type: Sequelize.DATE
    },
    BillingAddress: {
        field: 'BillingAddress',
        type: Sequelize.STRING
    },
    BillingCity: {
        field: 'BillingCity',
        type: Sequelize.STRING
    },
    BillingCountry: {
        field: 'BillingCountry',
        type: Sequelize.STRING
    },
    total: {
        field: 'Total',
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false
});