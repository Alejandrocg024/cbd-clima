const express = require('express');
const cityModel = require('../models/cityModel');

const router = express.Router();

router.post("/", async (req, res) => {
    const body = req.body;
    const response = await cityModel.create(body);
    res.send(response);
});

router.get("/", async(req, res) => {
    const response = await cityModel.find({});
    res.send(response);
});

module.exports = router;