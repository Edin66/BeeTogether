const Location = require("../Models/Location");
const locationService = require("../Services/locationService");

const getBestLocations = async (req, res) => {
  const result = await locationService.getBestLocations();
  res.send(result);
};

const addNewLocation = async (req, res) => {
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    // Check if the authorization header exists and has the correct format
    const token = authHeader.split(" ")[1];
    const newLocation = extractLocation(req);
    const result = await execAddNewLocation(newLocation, token);
    res.send(result);
  } else {
    res.send("Unauthorized");
  }
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

const locationController = { addNewLocation, getBestLocations };

module.exports = locationController;
