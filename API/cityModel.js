const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    koppen_id: {
        type: String,
        required: true
    },
    timezone: {
        type: String,
        required: true
    },
    coordinates: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    }
}, {
    timestamps: true,
    versionKey: false
}
);

const CityModel = mongoose.model('City', citySchema);

module.exports = CityModel;