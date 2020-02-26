const sequelize = require("../database/sequelize")
const Sequelize = require("sequelize");

module.exports = sequelize.define('invoice_items', {
    InvoiceLineId: {
        field: 'invoiceLineId',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    InvoiceId: {
        field: 'InvoiceId',
        type: Sequelize.INTEGER
    },
    TrackId: {
        field: 'TrackId',
        type: Sequelize.INTEGER
    },
    UnitPrice: {
        field: 'UnitPrice',
        type: Sequelize.INTEGER
    },
    Quantity: {
        field: 'Quantity',
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false
});