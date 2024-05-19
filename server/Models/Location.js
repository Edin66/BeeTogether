const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  dailySurplus: {
    type: Number,
    required: true,
  },
  numberOfHives: {
    type: Number,
    required: true,
  },
  beekeeper: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  pasture: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
});

const Location = mongoose.model("Location", LocationSchema);
module.exports = Location;
