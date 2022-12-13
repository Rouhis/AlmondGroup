/**
 * @author Leo Gong <Leo.Gong@metropolia.fi>
 */


"use strict";

/* Importing the express module and creating a router object. */
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { body } = require("express-validator");

/* Defining the routes for the router object. */
router
  .get("/", userController.getUsers)
  .get("/:userId", userController.getUser);

/* Exporting the router object. */
module.exports = router;
