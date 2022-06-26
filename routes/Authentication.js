const express = require("express");
const { RegisterUser } = require("../controllers/Authentication.Register");
const AuthenticationRouter = express.Router();

AuthenticationRouter.post("/register", RegisterUser);

module.exports = AuthenticationRouter;
