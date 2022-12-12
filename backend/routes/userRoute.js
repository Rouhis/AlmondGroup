"use strict";

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { body } = require("express-validator");

router
  .get("/", userController.getUsers)
  .get("/:userId", userController.getUser);

module.exports = router;
