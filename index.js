const express = require('express');
const { Sequelize, DataTypes, Op } = require('sequelize');
const path = require('path');

const app = express();
const port = 3000;

// Configuración de la base de datos
const sequelize = new Sequelize('hotel_reservaciones', 'root', 'admin1812', {
    host: 'localhost',
    dialect: 'mysql'
});

// Definir el modelo de reservas, apuntando a la nueva tabla
const Reservation = sequelize.define('Reservation', {
    nombre_huesped: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero_habitacion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha_check_in: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_check_out: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'hotel_reservaciones', // Especifica el nuevo nombre de la tabla aquí
    timestamps: false // Si no estás usando columnas de createdAt y updatedAt
});

// Middleware para parsear JSON
app.use(express.json());

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para verificar disponibilidad de habitaciones
app.get('/check-availability', async (req, res) => {
    const { checkInDate, checkOutDate } = req.query;

    try {
        const reservations = await Reservation.findAll({
            where: {
                [Op.and]: [
                    {
                        fecha_check_in: {
                            [Op.lte]: checkOutDate
                        }
                    },
                    {
                        fecha_check_out: {
                            [Op.gte]: checkInDate
                        }
                    }
                ]
            }
        });

        const occupiedRooms = reservations.map(reservation => ({
            numero_habitacion: reservation.numero_habitacion,
            fecha_check_in: reservation.fecha_check_in,
            fecha_check_out: reservation.fecha_check_out
        }));

        res.json({ occupiedRooms });
    } catch (error) {
        console.error('Error al verificar la disponibilidad:', error);
        res.status(500).json({ error: 'Error al verificar la disponibilidad' });
    }
});

// **Nueva ruta para manejar la reserva**
app.post('/reservar', async (req, res) => {
    const { guestName, roomNumber, checkInDate, checkOutDate } = req.body;

    try {
        const newReservation = await Reservation.create({
            nombre_huesped: guestName,
            numero_habitacion: roomNumber,
            fecha_check_in: checkInDate,
            fecha_check_out: checkOutDate
        });

        res.status(201).json(newReservation);
    } catch (error) {
        console.error('Error al realizar la reserva:', error);
        res.status(500).json({ error: 'Error al realizar la reserva' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

// Sincronizar el modelo con la base de datos (No necesario en este caso ya que la tabla ya existe)
sequelize.sync();
