"use strict"

const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const favController = require("../controllers/favController");

router.get("/",favController.getFav)
.get("/:userId",favController.getFavByUser)
.post("/",
body("userId"),
body("recipeId"),favController.addFav);

module.exports = router;