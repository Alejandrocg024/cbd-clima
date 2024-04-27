const express = require('express');
const koppenModel = require('../models/koppenModel');

const router = express.Router();

//Get(?type)
router.get("/", async (req, res) => {
    try {
        const group = req.query.group;
        const filter = {};

        if (group) {
            filter.group = group;
        };

        response = await koppenModel.find(filter);

        console.log(response);

        if (response.length === 0) {
            return res.status(404).send("No se encontraron datos con ese filtro");
        } else {
            return res.send(response);
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

//GetById
router.get("/:id", async (req, res) => {
    try {
        const koppenId = req.params.id;
        const response = await koppenModel.findById(koppenId);

        if (!response) {
            return res.status(404).send("El koppen no fue encontrado.");
        } else {
            res.send(response);
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

// Delete
router.delete("/:id", async (req, res) => {
    try {
        const koppenId = req.params.id;
        const deletedKoppen = await koppenModel.findByIdAndDelete(koppenId);

        if (!deletedKoppen) {
            return res.status(404).send("El koppen no fue encontrado.");
        } else {
            res.send(deletedKoppen);
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

module.exports = router;