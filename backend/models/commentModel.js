/**
 * @author Axel Kähkönen <axel.kahkonen@metropolia.fi>
 */
"use strict";

const pool = require("../db/db");
const promisePool = pool.promise();

/**
 * It returns a promise that resolves to an array of objects, each object representing a row in the
 * comments table.
 * @param res - the response object
 * @returns the rows from the database.
 */
const getAllComments = async (res) => {
  try {
    const [rows] = await promisePool.query("SELECT * FROM comments");
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

/**
 * It gets all the comments from the database that have the same recipe_id as the recipe_id that was
 * passed in
 * @param res - the response object
 * @param recipeId - the id of the recipe
 * @returns An array of objects.
 */
const getCommentsByRecipeId = async (res, recipeId) => {
  try {
    const [rows] = await promisePool.query(
      "SELECT * FROM comments WHERE recipe_id=?",
      [recipeId]
    );
    console.log("getting commets", rows);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

/**
 * It takes in a userId and returns all the comments that have that userId.
 * @param res - the response object
 * @param userId - the id of the user who made the comment
 * @returns An array of objects.
 */
const getCommentByUserId = async (res, userId) => {
  try {
    const [rows] = await promisePool.query(
      "SELECT * FROM comments WHERE user_id=?",
      [userId]
    );
    console.log("getting comments by userID", rows);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

/**
 * It takes a comment object, and inserts it into the database.
 * @param comment - {
 * @param res - response object
 * @returns The result of the query.
 */
const addComment = async (comment, res) => {
  try {
    const [result] = await promisePool.query(
      "INSERT INTO comments(user_id,recipe_id,data) VALUES (?,?,?)",
      [comment.user_id, comment.recipe_id, comment.data]
    );
    console.log([result]);
    return result.insertId;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

/**
 * It deletes a comment from the database if the comment id and user id match.
 * @param comment - {
 * @param res - the response object
 * @returns The rows that were deleted.
 */
const deleteComment = async (comment, res) => {
  try {
    const [rows] = await promisePool.query(
      "DELETE FROM comments WHERE id=? AND user_id=?",
      [comment.id, comment.user_id]
    );
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

/**
 * It takes a recipeId as a parameter and returns an array of objects containing the comment id,
 * comment data, and username of the user who made the comment.
 * @param res - response object
 * @param recipeId - the id of the recipe that the comment is associated with
 * @returns An array of objects.
 */
const getCommentAndUser = async (res, recipeId) => {
  try {
    const [rows] = await promisePool.query(
      "SELECT comments.id, comments.data, user.username FROM comments INNER JOIN user ON comments.user_id = user.id WHERE comments.recipe_id =?;",
      [recipeId]
    );
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};


module.exports = {
  getAllComments,
  getCommentsByRecipeId,
  getCommentByUserId,
  addComment,
  deleteComment,
  getCommentAndUser,
};
