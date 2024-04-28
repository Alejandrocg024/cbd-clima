const express = require('express');
const airQualityModel = require('../models/airQualityModel');
const CityModel = require('../models/cityModel');

const router = express.Router();

// Get(?city?date?hour?includeCityData)
router.get("/", async (req, res) => {
    try {
        const cityName = req.query.city;
        const hour = req.query.hour;
        const date = req.query.date;
        const filter = {};

        if (cityName) {
            console.log(cityName);
            const city = await CityModel.findOne({ name: cityName });
            console.log(city);
            if (city) {
                filter.city = city._id; 
            } else {
                return res.status(404).send("No se encontró la ciudad con ese nombre.");
            }
        };

        if (date && hour) {
            const dateTime = new Date(date);
            dateTime.setUTCHours(hour);
            filter.date_time = dateTime;
        } else if (date) {

            // Referencia a esto en el apartado referencias de la memoria
            const dateTime = new Date(date);
            const lwdate = new Date(date);
            lwdate.setUTCHours(23);
            lwdate.setUTCMinutes(59);
            filter.date_time = {
                $gte: dateTime,
                $lt: lwdate
              };
        } else if (hour) {
            return res.status(400).send("Para filtrar por hora se necesita la fecha.");
        }

        const includeCityData = req.query.includeCityData === 'true';
        let response = null;

        if (includeCityData) {

            response = await airQualityModel.aggregate([
                {
                    $match: filter 
                },
                {
                    $lookup: {
                        from: "city",
                        localField: "city",
                        foreignField: "_id",
                        as: "city_info"
                    }
                }
            ]).exec();

        } else {
            response = await airQualityModel.find(filter);
        }

        if (response.length === 0) {
            return res.status(404).send("No se encontraron datos con ese filtro.");
        } else {
            return res.send(response);
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

// Post
router.post("/", async (req, res) => {
    try {
        const body = req.body;

        const existingWeather = await weatherModel.findOne({ city: body.city, date_time: body.date_time });
        if (existingWeather) {
            return res.status(400).send("Ya existe un registro con esta fecha y hora para esta ciudad.");
        }

        const response = await airQualityModel.create(body);
        res.send(response);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});


// Delete
router.delete("/:id", async (req, res) => {
    try {
        const airQualityId = req.params.id;
        const deletedAirQuality = await airQualityModel.findByIdAndDelete(airQualityId);

        if (!deletedAirQuality) {
            return res.status(404).send("Los datos no fueron encontrados.");
        } else {
            res.send(deletedAirQuality);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;