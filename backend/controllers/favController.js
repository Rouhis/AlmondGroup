/**
 * @author Axel Kähkönen <axel.kahkonen@metropolia.fi>
 */

"use strict";

const { validationResult } = require("express-validator");
const { createPool } = require("mysql2");
const favModel = require("../models/favModel")

/**
 * This function checks if a user has favorited a recipe.
 * @param req - the request object
 * @param res - the response object
 */
const getFav = async (req, res) => {
  const favo = req.body;
  favModel.checkFav(favo, res);
  res.status(201).json({ message: "Favorite check" });
};

/**
 * It gets the favorite by user_id.
 * @param req - the request object
 * @param res - the response object
 */
const getFavByUser = async (req, res) => {
  const fav = await favModel.getFavByUser(res, req.params.userId);
  if (fav) {
    res.json(fav);
  } else {
    res.sendStatus(404);
  }
};

/**
 * It takes a request and a response, validates the request, and if the request is valid, it adds the
 * request to the database and returns a response.
 * @param req - the request object
 * @param res - the response object
 */
const addFav = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty) {
    const favo = req.body;
    console.log("adding to favorite", favo);
    const favId = await favModel.addFav(favo, res);
    res.status(201).json({ message: "added to favorite", favId });
  } else {
    console.log("validation errors", errors);
    res
      .status(400)
      .json({ message: "favorite add failed", errors: errors.array() });
  }
};

/**
 * Removes favorited recipe from database
 * @param {*} req 
 * @param {*} res 
 */
const removeFav = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty) {
    const favo = req.body;
    console.log("removing from favorites", favo);
    const favId = favModel.removeFav(favo, res);
    res.status(201).json({ message: "removed from favorites", favId });
  } else {
    console.log("validation errors", errors);
    res
      .status(400)
      .json({ message: "favorite remove failed", errors: errors.array() });
  }
};

/**
 * It checks if a recipe is already a favorite of a user.
 * @param req - {
 * @param res - the response object
 */
const checkFav = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty) {
    const favo = req.body;
    favModel.checkFav(req.params.userId, req.params.recipeId, favo, res);
    res.status(201).json({ message: "Favorite check", checkFav });
    // return true;
  } else {
    console.log("validation erros", errors);
    res
      .status(400)
      .json({ message: "favorite checking failed", errors: errors.array() });
    //return
  }
};

module.exports = {
  getFav,
  getFavByUser,
  addFav,
  removeFav,
  checkFav,
};