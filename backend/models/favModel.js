/**
 * @author Axel Kähkönen <axel.kahkonen@metropolia.fi>
 */
"use strict";

const pool = require("../db/db");
const promisePool = pool.promise();
const favController = require("../controllers/favController");

/**
 * It returns a promise that resolves to an array of rows from the fav table.
 * @param res - the response object
 * @returns The rows from the database.
 */
const getFav = async (res) => {
  try {
    const [rows] = await promisePool.query("SELECT * FROM fav");
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

/**
 * "getFavByUser" is a function that takes in a response and a userId and returns the rows of the
 * database that match the userId.
 */
const getFavByUser = async (res, userId) => {
  try {
    const [rows] = await promisePool.query(
      "SELECT recipe.id, recipe.name, recipe.ingredients, recipe.instructions, recipe.img FROM recipe INNER JOIN fav ON recipe.id = fav.recipe_id WHERE fav.user_id=?",
      [userId]
    );
    console.log("getting favovites", rows);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

/**
 * It takes a favo object and a response object as parameters, and then it tries to insert the favo
 * object into the fav table
 * @param favo - {
 * @param res - response object
 */
const addFav = async (favo, res) => {
  try {
    const [result] = await promisePool.query(
      "INSERT INTO fav(recipe_id, user_id) VALUES (?,?)",
      [favo.recipeId, favo.userId]
    );
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

/**
 * It deletes a row from the fav table where the recipe_id and user_id match the recipeId and userId of
 * the favo object.
 * @param favo - {
 * @param res - response object
 */
const removeFav = async (favo, res) => {
  try {
    const [result] = await promisePool.query(
      "DELETE FROM fav WHERE recipe_id=? AND user_id=?",
      [favo.recipeId, favo.userId]
    );
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

/**
 * It checks if a user has already favorited a recipe, if they have, it removes it, if they haven't, it
 * adds it.
 * @param userId - 1
 * @param recipeId - 1
 * @param favo - {
 * @param res - response object
 */
const checkFav = async (userId, recipeId, favo, res) => {
  try {
    const [result] = await promisePool.query(
      "SELECT COUNT(id) FROM fav WHERE recipe_id=? AND user_id=?",
      [favo.recipeId, favo.userId]
    );
    const newResult = JSON.stringify(result[0]).match(/\d/g);
    console.log(newResult[0]);
    if (newResult > 0) {
      console.log("Deleting existing favorite");
      removeFav(favo);
    } else {
      console.log("Adding to favorites");
      addFav(favo);
    }
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

module.exports = {
  getFav,
  getFavByUser,
  addFav,
  removeFav,
  checkFav,
};
