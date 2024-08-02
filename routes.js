const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

router.post('/reservations', async (req, res) => {
    const { guestName, roomNumber, checkInDate, checkOutDate } = req.body;
    try {
        const reservation = await Reservation.create({ guestName, roomNumber, checkInDate, checkOutDate });
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la reserva' });
    }
});

router.get('/reservations', async (req, res) => {
    try {
        const reservations = await Reservation.findAll();
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener reservas' });
    }
});

module.exports = router;
