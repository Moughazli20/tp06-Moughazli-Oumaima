const { DataTypes } = require('sequelize');
const sequelize = require('../db'); 

const Catalogue = sequelize.define('Catalogue', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    image: DataTypes.TEXT,
    ref: DataTypes.TEXT,
    title: DataTypes.TEXT,
    prix: DataTypes.FLOAT
}, {
    tableName: 'catalogue',
    timestamps: false
});

module.exports = Catalogue;