"use strict";

const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const commentController = require("../controllers/commentController");

router
  .get("/", commentController.getComments)
  .get("/:recipeId", commentController.getCommentsByRecipeId)
  .get("/user/:userId", commentController.getCommentByUserId)
  .get("/user/recipe/:recipeId", commentController.getCommentAndUser)
  .post(
    "/",
    body("user_id"),
    body("recipe_id"),
    body("data"),
    commentController.createComment
  )
  .delete(
    "/delete",
    body("id"),
    body("user_id"),
    commentController.deleteComment
  );

module.exports = router;
