const express = require('express');
const dbconnect = require('./config');
const cityController = require('./controllers/cityController');
const koppenController = require('./controllers/koppenController');
const weatherController = require('./controllers/weatherController');
const airQualityController = require('./controllers/airQualityController');

const app = express();

app.use(express.json());

app.use('/cities', cityController);
app.use('/koppen', koppenController);
app.use('/weather', weatherController);
app.use('/airQuality', airQualityController);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});

dbconnect();