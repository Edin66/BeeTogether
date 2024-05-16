const User = require("../Models/User");

const userService = require("../Services/userService");

const userRegister = async (req, res) => {
  const { fullName, email, password, phoneNumber } = req.body;
  const newUser = new User({ fullName, email, password, phoneNumber });
  const result = await execUserRegister(newUser);
  console.log("result:\n" + result);
  res.send(result);
};

const execUserRegister = async (newUser) => {
  return await userService.registerUser(newUser);
};

const userLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const result = await execUserLogin(email, password);
  console.log("END");
  res.send(result);
};

const execUserLogin = async (email, password) => {
  return await userService.loginUser(email, password);
};

const userController = { userLogin, userRegister };

module.exports = userController;
