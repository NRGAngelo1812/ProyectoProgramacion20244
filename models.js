const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Reservation = sequelize.define('Reservation', {
    guestName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roomNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    checkInDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    checkOutDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = Reservation;
