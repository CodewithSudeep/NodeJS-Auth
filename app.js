const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const mongoose = require("mongoose");
const AuthenticationRouter = require("./routes/Authentication");
const dbUri = process.env.MONGO_DB_URI;
mongoose
  .connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database => Connected Node.JS Authentication..."))
  .catch((err) => {
    console.log("database connection failed. exiting now...");
    console.error(err);
    process.exit(1);
  });

app
  .use(cors())
  .use(morgan("dev"))
  .use(express.json())
  .use("/api/authentication", AuthenticationRouter);

module.exports = app;
