const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema({
  room: {
    type: String,
    required: true,
    min: 3
  },
  sensortype: {
    type: String,
    required: true,
    max: 255,
    min: 2
  },
  temperature: {
    type: String,
    required: false,
    max: 1024,
    min: 2
  },
  humidity: {
    type: String,
    required: false,
    max: 1024,
    min: 2
  },
  pressure: {
    type: String,
    required: false,
    min: 2
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("sensor", sensorSchema);
