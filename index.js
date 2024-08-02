// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();

// Importar los módulos necesarios
const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();

// Configuración del puerto
const port = process.env.PORT || 3000;

// Configurar la conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.stack);
        return;
    }
    console.log('Conectado a la base de datos.');
});

// Configurar middleware para parsear JSON
app.use(express.json());

// Configurar middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para crear una nueva reserva
app.post('/reservas', (req, res) => {
    const { nombreHuesped, numeroHabitacion, fechaCheckIn, fechaCheckOut } = req.body;

    const query = `
        INSERT INTO reservas (nombre_huesped, numero_habitacion, fecha_check_in, fecha_check_out)
        VALUES (?, ?, ?, ?)
    `;
    
    connection.query(query, [nombreHuesped, numeroHabitacion, fechaCheckIn, fechaCheckOut], (err, results) => {
        if (err) {
            console.error('Error al crear la reserva:', err.stack);
            res.status(500).send('Error al crear la reserva.');
            return;
        }
        res.status(201).send('Reserva creada con éxito.');
    });
});

// Ruta para obtener todas las reservas
app.get('/reservas', (req, res) => {
    const query = 'SELECT * FROM reservas';
    
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener reservas:', err.stack);
            res.status(500).send('Error al obtener reservas.');
            return;
        }
        res.json(results);
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});