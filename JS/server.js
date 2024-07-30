const express = require('express');
const mogoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hola Mundo')
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerti ${PORT}}`);
});

// Conexion MONGODB
mogoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
}).then(() => {
    console.log('Conectado a MongoDB');
}).catch((err) => {
    console.error('Error en la conexión a MongoDB:', err);
});