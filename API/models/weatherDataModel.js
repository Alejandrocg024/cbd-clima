const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weatherSchema = new Schema({
    city: {
        type: Schema.Types.ObjectId,
        ref: 'City', 
        required: true
    },
    properties: {
        air_temperature: {
            type: Number,
            required: true
        },
        dew_point: {
            type: Number,
            required: true
        },
        relative_humidity: {
            type: Number,
            required: true
        },
        precipitation: {
            type: Number,
            required: true
        },
        sea_level_pressure: {
            type: Number,
            required: true
        },
        weather_condition_role: {
            type: Number,
            required: true
        },
        wind: {
            direction: {
                type: Number,
                required: true
            },
            avg_speed: {
                type: Number,
                required: true
            }
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
const WeatherModel = mongoose.model('Weather', weatherSchema, 'weather_data'); 

module.exports = WeatherModel;