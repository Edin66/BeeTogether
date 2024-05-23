require("dotenv").config();
const jwt = require("jsonwebtoken");

const ServiceResponse = require("../Models/ServiceResponse");
const Location = require("../Models/Location");

//GET BEST LOCATIONS
const getBestLocations = async () => {
  const serviceResponse = new ServiceResponse({ success: false });
  try {
    const locations = await Location.find().exec();

    //ARRANGE THE ARRAY ACCORDING TO THE BIGGEST DAILY SURPLUS
    const bestLocations = arrangeLocations(locations);

    serviceResponse.message = "Retrieved best Locations.";
    serviceResponse.data = { locations: bestLocations };
    serviceResponse.success = true;
  } catch (err) {
    serviceResponse.message = err.message;
  }

  return serviceResponse;
};

const arrangeLocations = (locations) => {
  locations.sort((a, b) => b.dailySurplus - a.dailySurplus);
  return locations;
};

//GET SPECIFIC LOCATION
const getSpecificLocation = async (locationId) => {
  const serviceResponse = new ServiceResponse({ success: false });
  try {
    const location = await Location.findById(locationId).exec();
    if (location) {
      serviceResponse.success = true;
      serviceResponse.message = "Retrieved location successfully.";
      serviceResponse.data = { location: location };
    }
  } catch (err) {
    serviceResponse.message = err.message;
  }
  return serviceResponse;
};

//ADD NEW LOCATION
const addNewLocation = async (newLocation, token) => {
  const serviceResponse = new ServiceResponse({ success: false });
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  newLocation.beekeeper = decodedToken.userId;
  //VALIDATE IF THE NEWLOCATION IS COMPLETE AND CORRECT
  if (!isValidLocation(newLocation)) {
    serviceResponse.message = "All fields are required.";
    return serviceResponse;
  }
  if (
    !isValidDailySurplus(newLocation.dailySurplus) ||
    !isValidNumberOfHives(newLocation.numberOfHives)
  ) {
    serviceResponse.message = "Make sure to enter the correct information.";
    return serviceResponse;
  }

  //ADD LOCATION TO THE DATABASE
  await newLocation.save();
  serviceResponse.success = true;
  serviceResponse.message = "Location successfully added!";
  serviceResponse.data = {
    title: newLocation.title,
    beekeeper: newLocation.beekeeper,
  };

  return serviceResponse;
};

const isValidLocation = (location) => {
  return (
    location.title &&
    location.latitude &&
    location.longitude &&
    location.dailySurplus &&
    location.numberOfHives &&
    location.beekeeper &&
    location.pasture &&
    location.duration
  );
};

const isValidDailySurplus = (dailySurplus) => {
  return !isNaN(dailySurplus);
};

const isValidNumberOfHives = (numberOfHives) => {
  return !isNaN(numberOfHives) && numberOfHives > 0;
};

//DELETE SPECIFIC LOCATION
const deleteLocation = async (locationId) => {
  const serviceResponse = { success: false };
  try {
    const location = await Location.findByIdAndDelete(locationId);
    if (!location) {
      serviceResponse.message = "Location not found.";
      return serviceResponse;
    }
    serviceResponse.success = true;
    serviceResponse.message = "Location deleted successfully.";
  } catch (error) {
    serviceResponse.message = error.message;
  }
  return serviceResponse;
};

const locationService = {
  addNewLocation,
  getBestLocations,
  getSpecificLocation,
  deleteLocation,
};

module.exports = locationService;
