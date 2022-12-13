/**
 * @author Leo Gong <Leo.Gong@metropolia.fi>
 */


/* Importing the express module and creating a router object. */
"use strict";

const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { login, logout, createUser } = require("../controllers/authController");

/* Creating a route for the login and register page. */
router
  .post("/login", login)
  .post(
    "/register",
    body("username").isLength({ min: 3 }).trim().escape(),
    body("password").isLength({ min: 5 }).trim(),
    createUser
  );
/* Exporting the router object. */

module.exports = router;
