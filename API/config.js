const mongoose = require('mongoose');

async function dbconnect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/climate');
        console.log('Conexión a MongoDB establecida correctamente.');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
    }
}

module.exports = dbconnect;