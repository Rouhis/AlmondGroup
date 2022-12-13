"use strict";
const { validationResult } = require("express-validator");
const pool = require("../db/db");
const promisePool = pool.promise();

const deleteComments = async (recipe, res) => {
    try {
      const [rows] = await promisePool.query(
        'DELETE FROM comments WHERE recipe_id=?',
        [recipe]
      );
      return rows;
    } catch (e) {
      console.error("error", e.message);
      res.status(500).send(e.message);
    }
  };

  const removeFavs = async (recipe, res) => {
    try {
      const [result] = await promisePool.query(
        "DELETE FROM fav WHERE recipe_id=?",
        [recipe]
      );
      return result
    } catch (e) {
      console.error("error", e.message);
      res.status(500).send(e.message);
    }
  };
  
  const deleteRecipe = async(recipe,res)=>{
    try{
      const [rows] = await promisePool.query(
        "DELETE FROM recipe WHERE id=?",
        [recipe]);
      console.log(rows);
      return rows
    } catch (e) {
      console.error("error", e.message);
      res.status(500).send(e.message);
    }
  }
  
  

  module.exports = {
    deleteComments,
    removeFavs,
    deleteRecipe

  };