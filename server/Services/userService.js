require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const ServiceResponse = require("../Models/ServiceResponse");
const User = require("../Models/User");
const Location = require("../Models/Location");

//REGISTER A NEW USER
const registerUser = async (newUser) => {
  const serviceReponse = new ServiceResponse({ success: false });

  try {
    const emailTaken = await User.findOne({ email: newUser.email });

    if (emailTaken) {
      serviceReponse.message = "Email in use.";
    } else {
      //ENCRYPT PASSWORD
      const hash = await bcrypt.hash(newUser.password, saltRounds);
      newUser.password = hash;
      await newUser.save();
      //CREATE A WEB TOKEN
      const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, {
        expiresIn: "6h",
      });
      serviceReponse.success = true;
      serviceReponse.message = "User registered successfully!";
      serviceReponse.data = {
        user: { fullName: newUser.fullName, phoneNumber: newUser.phoneNumber },
        token: token,
      };
    }
  } catch (err) {
    // Handle any errors that might occur during hashing or adding to the database
    console.error(err);
    serviceReponse.message = "Error registering user.";
  }

  return serviceReponse;
};

//LOG IN AN EXISTING USER
const loginUser = async (email, password) => {
  const serviceResponse = new ServiceResponse({ success: false });

  try {
    const foundUser = await User.findOne({ email: email });

    if (!foundUser) {
      serviceResponse.message = "Email is not in use!";
      return serviceResponse;
    }
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
          expiresIn: "6h",
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

//GET SPECIFIC USER BY ID
const getSpecificUser = async (userId) => {
  const serviceResponse = new ServiceResponse({ success: false });
  try {
    const user = await User.findById(userId).exec();

    if (user) {
      serviceResponse.success = true;
      serviceResponse.message = "Retrieved user successfully.";
      serviceResponse.data = { user: user };
    } else {
      serviceResponse.message = "User not found.";
    }
  } catch (err) {
    serviceResponse.message = err.message;
  }
  return serviceResponse;
};

const userService = { registerUser, loginUser, getUser, getSpecificUser };

module.exports = userService;
