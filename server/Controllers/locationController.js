const Location = require("../Models/Location");
const locationService = require("../Services/locationService");

const addNewLocation = async (req, res) => {
  const token = req.body.token;
  const newLocation = extractLocation(req);
  const result = await execAddNewLocation(newLocation, token);
  res.send(result);
};

const execAddNewLocation = async (newLocation, token) => {
  return await locationService.addNewLocation(newLocation, token);
};

const extractLocation = (req) => {
  const {
    title,
    latitude,
    longitude,
    dailySurplus,
    numberOfHives,
    pasture,
    duration,
  } = req.body;
  const newLocation = new Location({
    title,
    latitude,
    longitude,
    dailySurplus,
    numberOfHives,
    pasture,
    duration,
  });
  return newLocation;
};

const locationController = { addNewLocation };

module.exports = locationController;
