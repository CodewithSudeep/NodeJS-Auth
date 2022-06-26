const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Model = mongoose.model;
const ObjectId = Schema.ObjectId;

/**
 * 
 * @param {*} type 
 * @param {*} require 
 * @param {*} requiredMessage 
 * @returns 
 */
const returnType = (type, require, requiredMessage) => {
  return {
    type,
    require: require === true ? [require, requiredMessage] : [false],
  };
};

/**
 * 
 */
const userSchema = new Schema({
  _id: ObjectId,
  email: {
    ...returnType(String, true, "Email is required!"),
    unique: [true, "Email must be unique!"],
  },
  password: returnType(String, true, "Password is required"),
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: Date,
});

module.exports = Model("user", userSchema);
