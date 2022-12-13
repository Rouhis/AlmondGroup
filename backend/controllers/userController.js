/**
 * @author Leo Gong <Leo.Gong@metropolia.fi>
 */


/* Importing the modules that are needed for the functions. */
"use strict";
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

/**
 * It gets all users from the database and sends them back to the client.
 * @param req - The request object.
 * @param res - The response object
 */
const getUsers = async (req, res) => {
  const users = await userModel.getAllUsers(res);
  res.json(users);
};

/**
 * If the user exists, return the user, otherwise return a 404.
 * @param req - The request object.
 * @param res - the response object
 */
const getUser = async (req, res) => {
  const user = await userModel.getUserById(res, req.params.userId);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

/* Exporting the functions so that they can be used in other files. */
module.exports = {
  getUsers,
  getUser,
};
