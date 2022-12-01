"use strict";

const express = require("express");
const router = express.Router();
const multer = require("multer");
const {body} = require("express-validator");
const recipeController = require("../controllers/recipeController");

const fileFilter = (req, file, cb) => {
    const acceptedTypes = ["image/jpeg","image/png","image/gif"];
    if (acceptedTypes.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(null,false);
    }
};

const upload = multer({dest: "uploads/", fileFilter});

router.get("/",recipeController.getRecipes)
.get("/:recipeId", recipeController.getRecipeById)
.get("/user/:userId",recipeController.getRecipeByUserId);

module.exports = router;