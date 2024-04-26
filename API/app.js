const express = require('express');
const dbconnect = require('./config');
const cityController = require('./controllers/cityController');

const app = express();

app.use(express.json());

app.use('/cities', cityController); // Asignar el controlador de City a la ruta '/cities'
// app.use('/otroModelo', otroModeloController); // Asignar otros controladores a las rutas correspondientes

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});

dbconnect();