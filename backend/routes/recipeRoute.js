/**
 * @author Axel Kähkönen <axel.kahkonen@metropolia.fi>
 */
"use strict";

const express = require("express");
const router = express.Router();
const multer = require("multer");
const { body } = require("express-validator");
const recipeController = require("../controllers/recipeController");

const fileFilter = (req, file, cb) => {
  const acceptedTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
  if (acceptedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ dest: "./backend/uploads/", fileFilter });

router
  .get("/", recipeController.getRecipes)
  .get("/:recipeId", recipeController.getRecipeById)
  .get("/user/:userId", recipeController.getRecipeByUserId)
  .get("/name/:recipeName", recipeController.getRecipeByName)
  .post(
    "/",
    upload.single("recipe"),
    body("name"),
    body("userid"),
    body("ingredients"),
    body("instructions"),
    //body("img"),
    recipeController.createRecipe
  )
  .delete("/:recipeId",recipeController.deleteRecipeCommentFav)
  .put("/", recipeController.modifyRecipeById);

module.exports = router;
