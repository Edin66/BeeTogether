require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const ServiceResponse = require("../Models/ServiceResponse");
const User = require("../Models/User");
const Location = require("../Models/Location");

//REGISTER A NEW USER
const registerUser = async (newUser) => {
  const serviceReponse = new ServiceResponse();
  const emailTaken = await User.findOne({ email: newUser.email });

  if (emailTaken) {
    serviceReponse.message = "Email in use.";
    serviceReponse.success = false;
  } else {
    try {
      //ENCRYPT PASSWORD
      const hash = await bcrypt.hash(newUser.password, saltRounds);
      newUser.password = hash;
      await newUser.save();
      serviceReponse.success = true;
      serviceReponse.message = "User registered successfully!";
      serviceReponse.data = {
        fullName: newUser.fullName,
        phoneNumber: newUser.phoneNumber,
      };
    } catch (err) {
      // Handle any errors that might occur during hashing or adding to the database
      console.error(err);
      serviceReponse.message = "Error registering user.";
      serviceReponse.success = false;
    }
  }
  return serviceReponse;
};

//LOG IN AN EXISTING USER
const loginUser = async (email, password) => {
  const serviceResponse = new ServiceResponse({ success: false });
  const foundUser = await User.findOne({ email: email });

  if (!foundUser) {
    serviceResponse.message = "Email is not in use!";
    return serviceResponse;
  }

  try {
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (isPasswordCorrect) {
      //CREATE A WEB TOKEN
      const token = jwt.sign(
        { userId: foundUser._id },
        process.env.SECRET_KEY,
        {
          expiresIn: "24h",
        }
      );
      serviceResponse.success = true;
      serviceResponse.message = "Successful login";
      serviceResponse.data = {
        user: {
          fullName: foundUser.fullName,
          phoneNumber: foundUser.phoneNumber,
        },
        token: token,
      };
    } else {
      serviceResponse.message = "Incorrect password";
    }
  } catch (err) {
    serviceResponse.message = err.message;
  }
  return serviceResponse;
};

//GET USER INGORMATION
const getUser = async (token) => {
  const serviceReponse = new ServiceResponse({ success: false });
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;

    const foundUser = await User.findOne({ _id: userId }).select("-password");
    if (!foundUser) {
      serviceReponse.message = "User not found";
      return serviceReponse;
    }
    const userLocations = await Location.find({ beekeeper: userId }).exec();

    const userObject = foundUser.toObject();
    userObject.locations = userLocations;

    serviceReponse.success = true;
    serviceReponse.message = "User retrieved successfully";
    serviceReponse.data = userObject;
  } catch (err) {
    serviceReponse.message = err.message;
  }

  return serviceReponse;
};

const userService = { registerUser, loginUser, getUser };

module.exports = userService;
