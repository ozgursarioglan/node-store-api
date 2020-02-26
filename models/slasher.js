const sequelize = require("../database/sequelize")
const Sequelize = require("sequelize");

module.exports = sequelize.define('slasher', {
    id: {
        field: 'Id',
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    IhzarPartiID: {
        field: 'IhzarPartiID',
        type: Sequelize.INTEGER
    },
    UrunAdi: {
        field: 'UrunAdi',
        type: Sequelize.STRING
    },
    IhzarPartiNo: {
        field: 'IhzarPartiNo',
        type: Sequelize.INTEGER
    },
    MakinaNo: {
        field: 'MakinaNo',
        type: Sequelize.STRING
    },
    KafaSay: {
        field: 'KafaSay',
        type: Sequelize.INTEGER
    },
    ToplamUretimMt: {
        field: 'ToplamUretimMt',
        type: Sequelize.INTEGER
    },
    TemizUretimToplam: {
        field: 'TemizUretimToplam',
        type: Sequelize.INTEGER
    },
    TemizLeventSay: {
        field: 'TemizLeventSay',
        type: Sequelize.INTEGER
    },
    BaslangicZamani: {
        field: 'BaslangicZamani',
        type: Sequelize.DATE
    },
    BitisZamani: {
        field: 'BitisZamani',
        type: Sequelize.DATE
    },
    Fark: {
        field: 'Fark',
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false
});