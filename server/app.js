const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

//const userRouter = require("./Routers/userRouter");
const userController = require("./Controllers/userController");

app.post("/register", async (req, res) => {
  console.log("START");
  await userController.userRegister(req, res);
});

app.post("/login", async (req, res) => {
  console.log("LOGIN");
  await userController.userLogin(req, res);
});

//app.use("/login", userRouter);

app.listen("7000", () => {
  console.log(`Server is up and running on port 7000`);
});
