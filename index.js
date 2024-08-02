// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();

// Importar los módulos necesarios
const express = require('express');
const mysql = require('mysql2');
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

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Sistema de Gestión de Reservas');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});