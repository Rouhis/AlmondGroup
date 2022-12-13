/**
 * @author Axel Kähkönen <axel.kahkonen@metropolia.fi>
 */
"use strict";
const { validationResult } = require("express-validator");
const pool = require("../db/db");
const promisePool = pool.promise();

/**
 * Returns all recipes from database.
 * @param res - the response object
 * @returns the rows from the database.
 */
const getAllRecipes = async (res) => {
  try {
    const [rows] = await promisePool.query("SELECT * FROM recipe");
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

/**
 * Gets a recipes that is determinated by id.
 * @param res - the response object
 * @param recipeId - the id of the recipe to be retrieved
 * @returns the recipe object.
 */
const getRecipeById = async (res, recipeId) => {
  try {
    const [rows] = await promisePool.query(
      "SELECT * FROM recipe WHERE id = ?",
      [recipeId]
    );
    console.log("getting recipe", rows[0]);
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

/**
 * This function gets all recipes from the database that are associated with a specific user ID.
 * @param res - response object
 * @param userId - 1
 * @returns An array of objects.
 */
const getRecipeByUserId = async (res, userId) => {
  try {
    const [rows] = await promisePool.query(
      "SELECT * FROM recipe WHERE user_id = ?",
      [userId]
    );
    console.log("getting recipes by userID", rows);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

/**
 * It takes a recipe object, and inserts it into the database.
 * @param recipe - {
 * @param res - response object
 * @returns The id of the recipe that was just added to the database.
 */
const addRecipe = async (recipe, res) => {
  try {
    const [result] = await promisePool.query(
      "INSERT INTO recipe (name,user_id,ingredients,instructions,img) VALUES (?,?,?,?,?)",
      [
        recipe.name,
        recipe.userid,
        recipe.ingredients,
        recipe.instructions,
        recipe.filename,
      ]
    );
    console.log([result]);
    return result.insertId;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

/**
 * It updates a recipe in the database.
 * @param recipe - {
 * @param userId - the id of the user who is logged in
 * @param res - response object
 * @returns The updated recipe.
 */
const updateRecipeById = async (recipe, userId, res) => {
  try {
    let sql, values;
    sql =
      "UPDATE recipe SET name=?,ingredients=?, instructions=?, img=? WHERE id=?";
    values = [
      recipe.name,
      recipe.ingredients,
      recipe.instructions,
      recipe.img,
      recipe.id,
    ];
    const [rows] = await promisePool.query(sql, values);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).json({ error: e.message });
  }
};

/**
 * It takes a response object and a recipe name as parameters, and returns a list of recipes that match
 * the recipe name
 * @param res - response object
 * @param recipeName - "chicken"
 * @returns [rows]
 */
const getRecipeByName = async (res, recipeName) => {
  try {
    const [rows] = await promisePool.query(
      "SELECT * FROM recipe WHERE name LIKE ?",
      [recipeName + "%"]
    );
    console.log([rows]);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const deleteRecipeCommentFav = async(recipeId,res)=>{
  try{
    const rows = await promisePool.query("DELETE FROM comments WHERE recipe_id=19","DELETE FROM fav WHERE recipe_id=19","DELETE FROM recipe WHERE id=19");
    console.log(rows);
    return rows
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  getRecipeByUserId,
  addRecipe,
  updateRecipeById,
  getRecipeByName,
  deleteRecipeCommentFav
};
