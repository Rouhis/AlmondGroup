"use strict";

const { validationResult } = require("express-validator");
const { createPool } = require("mysql2");
const favModel = require("../models/favModel");

const getFav = async (req, res) => {
  const favo = req.body;
  favModel.checkFav(favo, res);
  res.status(201).json({ message: "Favorite check" });
};

const getFavByUser = async (req, res) => {
  const fav = await favModel.getFavByUser(res, req.params.userId);
  if (fav) {
    res.json(fav);
  } else {
    res.sendStatus(404);
  }
};

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
