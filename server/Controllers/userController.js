const User = require("../Models/User");

const userService = require("../Services/userService");

//USER REGISTER
const userRegister = async (req, res) => {
  const { fullName, email, password, phoneNumber } = req.body;
  const newUser = new User({ fullName, email, password, phoneNumber });
  const result = await execUserRegister(newUser);
  res.send(result);
};

const execUserRegister = async (newUser) => {
  return await userService.registerUser(newUser);
};

//USER LOGIN
const userLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const result = await execUserLogin(email, password);
  res.send(result);
};

const execUserLogin = async (email, password) => {
  return await userService.loginUser(email, password);
};

//GET USER FROM TOKEN
const getUser = async (req, res) => {
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    // Check if the authorization header exists and has the correct format
    const token = authHeader.split(" ")[1]; // Extract the token from the authorization header
    const result = await userService.getUser(token);
    res.send(result);
  } else {
    res.send("Unauthorized");
  }
};

//GET SPECIFIC USER BY ID
const getSpecificUser = async (req, res) => {
  const userId = req.body.id;
  const result = await userService.getSpecificUser(userId);
  res.send(result);
};

const userController = { userLogin, userRegister, getUser, getSpecificUser };

module.exports = userController;
