const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const koppenSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    properties: {
        precipitation_type: {
            type: String,
            required: true
        },
        lvl_heat: {
            type: String,
            required: true
        },
        temperature_type: {
            type: String,
            required: true
        },
        extreme_climatic_events: {
            type: [String],
            required: true
        }
    }
}, {
    timestamps: true,
    versionKey: false
});

const KoppenModel = mongoose.model('Koppen', koppenSchema, 'koppen'); 

module.exports = KoppenModel;