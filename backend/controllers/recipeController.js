/**
 * @author Axel Kähkönen <axel.kahkonen@metropolia.fi>
 */
"use strict";
const { validationResult } = require("express-validator");
const recipeModel = require("../models/recipeModel");
const adminModel = require("../models/adminModel")


/**
 * It's a function that takes in a request and a response, and then it gets all the recipes from the
 * database, and then it sends the recipes back to the client.
 * @param req - The request object.
 * @param res - the response object
 */
const getRecipes = async (req, res) => {
  const recipes = await recipeModel.getAllRecipes(res);
  res.json(recipes);
};

/**
 * It gets a recipe by its id.
 * @param req - The request object.
 * @param res - the response object
 */
const getRecipeById = async (req, res) => {
  const recipe = await recipeModel.getRecipeById(res, req.params.recipeId);
  if (recipe) {
    res.json(recipe);
  } else {
    res.sendStatus(404);
  }
};

/**
 * It gets all the recipes from the database that are associated with the userId that is passed in as a
 * parameter.
 * @param req - the request object
 * @param res - the response object
 */
const getRecipeByUserId = async (req, res) => {
  const recipes = await recipeModel.getRecipeByUserId(res, req.params.userId);
  if (recipes) {
    res.json(recipes);
  } else {
    res.sendStatus(404);
  }
};

/**
 * It creates a new recipe in the database and returns the id of the newly created recipe.
 * @param req - the request object
 * @param res - the response object
 */
const createRecipe = async (req, res) => {
  const errors = validationResult(req);
  if (!req.file) {
    res.status(400).json({ message: "Missing image or invalid file format" });
  } else if (errors.isEmpty) {
    const recipe = req.body;
    recipe.filename = req.file.filename;
    console.log("Creating a new recipe", recipe);
    const recipeId = await recipeModel.addRecipe(recipe, res);
    res.status(201).json({ message: "recipe created", recipeId });
  } else {
    console.log("validation errors", errors);
    res
      .status(400)
      .json({ message: "recipe creation failed", errors: errors.array() });
  }
};

const modifyRecipeById = async (req, res) => {
  const recipe = req.body;
  if (req.params.recipeId) {
    recipe.id = req.params.recipeId;
  }
  const result = await recipeModel.updateRecipe(recipe);
  if (result.affectedRows > 0) {
    res.json({ message: "recipe modified: " + recipe.id });
  } else {
    res.status(400).json({ message: "nothing modified" });
  }
};

/**
 * It's a function that takes in a request and a response, and then it gets a recipe by name from the
 * database, and if it finds a recipe, it sends the recipe back to the client, and if it doesn't find a
 * recipe, it sends a 404 status code back to the client.
 * @param req - The request object.
 * @param res - the response object
 */
const getRecipeByName = async (req, res) => {
  const recipes = await recipeModel.getRecipeByName(res, req.params.recipeName);
  if (recipes) {
    res.json(recipes);
  } else {
    res.sendStatus(404);
  }
};

const deleteRecipeCommentFav = async (req,res) => {
  const recipeId = req.params.recipeId;
  const favResult = await adminModel.removeFavs(recipeId, res);
  const commentResult = await adminModel.deleteComments(recipeId, res);
  const recipeResult = await adminModel.deleteRecipe(recipeId,res);
  if (favResult.affectedRows + commentResult.affectedRows + recipeResult.affectedRows > 0) {
    res.json({ message: "fav deleted" });
  } else {
    res.status(401).json({ message: "fav delete failed" });
  }

}

module.exports = {
  getRecipes,
  getRecipeById,
  getRecipeByUserId,
  createRecipe,
  modifyRecipeById,
  getRecipeByName,
  deleteRecipeCommentFav
};
