"use strict";

const pool = require("../db/db");
const promisePool = pool.promise();
const favController = require("../controllers/favController");

const getFav = async (res) => {
  try {
    const [rows] = await promisePool.query("SELECT * FROM fav");
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

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
