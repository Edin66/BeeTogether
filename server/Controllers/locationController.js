const Location = require("../Models/Location");
const locationService = require("../Services/locationService");

//GET BEST LOCATIONS
const getBestLocations = async (req, res) => {
  const result = await locationService.getBestLocations();
  res.send(result);
};

//GET SPECIFIC LOCATION
const getSpecificLocation = async (req, res) => {
  const locationId = req.params.id;
  const response = await locationService.getSpecificLocation(locationId);
  res.send(response);
};

//ADD A NEW LOCATION
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

//DELETE SPECIFIC LOCATION
const deleteLocation = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await locationService.deleteLocation(id);
    if (result.success) {
      return res
        .status(200)
        .json({ message: "Location deleted successfully." });
    }
    return res.status(400).json({ message: result.message });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const locationController = {
  addNewLocation,
  getBestLocations,
  getSpecificLocation,
  deleteLocation,
};

module.exports = locationController;
