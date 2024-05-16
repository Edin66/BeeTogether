const ServiceResponse = require("../Models/ServiceResponse");
const client = require("../Database/Utils");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const registerUser = async (newUser) => {
  const serviceReponse = new ServiceResponse();
  const emailTaken = await checkIfEmailIsTaken(newUser.email);

  if (emailTaken) {
    serviceReponse.message = "Email in use.";
    serviceReponse.success = false;
  } else {
    try {
      //ENCRYPT PASSWORD
      const hash = await bcrypt.hash(newUser.password, saltRounds);
      newUser.password = hash;
      await addUserToDatabase(newUser);
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

const addUserToDatabase = async (user) => {
  return client
    .db("BeeTogether")
    .collection("Users")
    .insertOne(user)
    .then(() => {
      console.log("SUCCESS\n" + user);
    });
};

const checkIfEmailIsTaken = async (email) => {
  const result = await client
    .db("BeeTogether")
    .collection("Users")
    .findOne({ email: email }, (err) => {
      if (err) console.log(err);
    });
  // if (result) return true;
  // else return false;
  return result;
};

const loginUser = async (email, password) => {
  const serviceResponse = new ServiceResponse({ success: false });
  const foundUser = await checkIfEmailIsTaken(email);

  console.log("\nSERVICE START");

  if (!foundUser) {
    serviceResponse.message = "Email is not in use!";
    return serviceResponse;
  }

  try {
    const result = await bcrypt.compare(password, foundUser.password);
    if (result) {
      serviceResponse.success = true;
      serviceResponse.message = "Successful login";
    } else {
      serviceResponse.message = "Incorrect password";
    }
  } catch (err) {
    serviceResponse.message = err.message;
  }
  return serviceResponse;
};

const userService = { registerUser, loginUser };

module.exports = userService;
