const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const airQualitySchema = new Schema({
    city: {
        type: Schema.Types.ObjectId,
        ref: 'City', 
        required: true
    },
    air_quality_index: {
        type: Number,
        required: true
    },
    particulate_matter: {
        '10micrometre': {
            type: Number,
            required: true
        },
        '25micrometre': {
            type: Number,
            required: true
        }
    },
    gases: {
        co: {
            type: Number,
            required: true
        },
        no2: {
            type: Number,
            required: true
        },
        o2: {
            type: Number,
            required: true
        },
        so2: {
            type: Number,
            required: true
        }
    },
    date_time: {
        type: Date,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});
const AirQualityModel = mongoose.model('AirQuality', airQualitySchema, 'air_quality'); 

module.exports = AirQualityModel;