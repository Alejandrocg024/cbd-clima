const express = require('express');
const cityModel = require('../models/cityModel');

const router = express.Router();

//Get(?name?includeKoppenData)
router.get("/", async (req, res) => {
    try {
        const cityName = req.query.name;
        const country = req.query.country;
        const filter = {};

        if (cityName) {
            filter.name = cityName;
        };

        if (country) {
            filter.country = country;
        };

        const includeKoppenData = req.query.includeKoppenData === 'true';
        let response = null;

        if (includeKoppenData) {

            response = await cityModel.aggregate([
                {
                    $match: filter 
                },
                {
                    $lookup: {
                        from: "koppen",
                        localField: "koppen_id",
                        foreignField: "_id",
                        as: "koppen_info"
                    }
                }
            ]).exec();

        } else {
            response = await cityModel.find(filter);
        }

        if (response.length === 0) {
            return res.status(404).send("No se encontraron datos con ese filtro");
        } else {
            return res.send(response);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Post
router.post("/", async (req, res) => {
    try {
        const body = req.body;
        const response = await cityModel.create(body);
        res.send(response);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

//Put
router.put("/:id", async (req, res) => {
    try {
        const cityId = req.params.id;
        const updatedCityData = req.body;

        const updatedCity = await cityModel.findByIdAndUpdate(cityId, updatedCityData, { new: true });

        if (!updatedCity) {
            return res.status(404).send("La ciudad no fue encontrada.");
        } else {
            res.send(updatedCity);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// Delete
router.delete("/:id", async (req, res) => {
    try {
        const cityId = req.params.id;
        const deletedCity = await cityModel.findByIdAndDelete(cityId);

        if (!deletedCity) {
            return res.status(404).send("La ciudad no fue encontrada.");
        } else {
            res.send(deletedCity);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;