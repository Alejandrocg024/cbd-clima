const express = require('express');
const dbconnect = require('./config');
const cityModel = require('./cityModel');
const app = express();

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

app.use(express.json());
app.use(router);
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});

dbconnect();

