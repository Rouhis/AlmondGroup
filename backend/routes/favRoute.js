"use strict";

const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const favController = require("../controllers/favController");

router
  .get("/", favController.getFav)
  .get("/user/:userId", favController.getFavByUser)
  .get("/test/:userId/:recipeId", favController.checkFav)
  .post("/test/", body("recipeId"), body("userId"), favController.checkFav)
  .post("/", body("userId"), body("recipeId"), favController.addFav)
  .delete("/", body("userId"), body("recipeId"), favController.removeFav);

module.exports = router;
