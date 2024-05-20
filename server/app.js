const express = require("express");
const cors = require("cors");

const connectDB = require("./Database/Utils");
const userController = require("./Controllers/userController");
const locationController = require("./Controllers/locationController");

const app = express();

//Connect to DB
connectDB();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

//ROOT ROUTE WILL DISPLAY THE BEST LOCATIONS
app.get("/", async (req, res) => {
  await locationController.getBestLocations(req, res);
});

//REGISTER A NEW USER
app.post("/register", async (req, res) => {
  await userController.userRegister(req, res);
});

//LOGIN AN EXISTING USER
app.post("/login", async (req, res) => {
  await userController.userLogin(req, res);
});

//GET INFROMATION OF A LOGGED USER
app.get("/profile", async (req, res) => {
  await userController.getUser(req, res);
});

//ADD A NEW LOCATION
app.post("/add-location", async (req, res) => {
  await locationController.addNewLocation(req, res);
});

app.listen("7000", () => {
  console.log(`Server is up and running on port 7000`);
});
