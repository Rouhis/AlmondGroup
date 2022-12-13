/**
 * @author Axel Kähkönen <axel.kahkonen@metropolia.fi>
 */
"use strict";

const { validationResult } = require("express-validator");
const { createPool } = require("mysql2");
const commentModel = require("../models/commentModel");

/**
 * It gets all the comments from the database and sends them back to the client.
 * @param req - The request object.
 * @param res - the response object
 */
const getComments = async (req, res) => {
  const comments = await commentModel.getAllComments(res);
  res.json(comments);
};

/**
 * It gets comments by recipe id.
 * @param req - the request object
 * @param res - the response object
 */
const getCommentsByRecipeId = async (req, res) => {
  const comment = await commentModel.getCommentsByRecipeId(
    res,
    req.params.recipeId
  );
  if (comment) {
    res.json(comment);
  } else {
    res.sendStatus(404);
  }
};

/**
 * It gets all comments by a user id.
 * @param req - the request object
 * @param res - the response object
 */
const getCommentByUserId = async (req, res) => {
  const comments = await commentModel.getCommentByUserId(
    res,
    req.params.userId
  );
  if (comments) {
    res.json(comments);
  } else {
    res.sendStatus(404);
  }
};

/**
 * It creates a comment.
 * @param req - the request object
 * @param res - the response object
 */
const createComment = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty) {
    const comment = req.body;
    console.log("Creating a new comment", comment);
    const commentId = await commentModel.addComment(comment, res);
    res.status(201).json({ message: "comment created", commentId });
  } else {
    console.log("validation errors", errors);
    res
      .status(400)
      .json({ message: "comment creation failed", errors: errors.array() });
  }
};

/**
 * It deletes a comment from the database.
 * @param req - request
 * @param res - the response object
 */
const deleteComment = async (req, res) => {
  const comment = req.body;
  const result = await commentModel.deleteComment(comment, res);
  console.log("comment deleted", result);

  if (result.affectedRows > 0) {
    res.json({ message: "comment deleted" });
  } else {
    res.status(401).json({ message: "comment delete failed" });
  }
};

/**
 * It gets a comment and user from the database and returns it to the user.
 * @param req - the request object
 * @param res - response object
 */
const getCommentAndUser = async (req, res) => {
  const comment = await commentModel.getCommentAndUser(
    res,
    req.params.recipeId
  );
  if (comment) {
    res.json(comment);
  } else {
    res.status(401);
  }
};

module.exports = {
  getComments,
  getCommentsByRecipeId,
  getCommentByUserId,
  createComment,
  deleteComment,
  getCommentAndUser,
};
