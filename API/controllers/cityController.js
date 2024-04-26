const express = require('express');
const cityModel = require('../models/cityModel');

const router = express.Router();

//GetAll
router.get("/", async(req, res) => {
    const response = await cityModel.find({});
    res.send(response);
});

// GetByName(?includeKoppenData)
// GetByCountry(?includeKoppenData)
//Post
router.post("/", async (req, res) => {
    const body = req.body;
    const response = await cityModel.create(body);
    res.send(response);
});
//Put
// Delete

module.exports = router;