"use strict";
const { validationResult } = require("express-validator");
const pool = require("../db/db");
const promisePool = pool.promise();

const getAllRecipes = async (res) => {
    try{
        const [rows] = await promisePool.query("SELECT * FROM recipe")
        return rows
    } catch(e){
        console.error("error", e.message);
        res.status(500).send(e.message);
    }
};

const getRecipeById = async (res, recipeId) => {
    try{
        const [rows] = await promisePool.query("SELECT * FROM recipe WHERE id = ?",[recipeId]);
        console.log("getting recipe", rows[0]);
        return rows[0];
    }catch(e){
        console.error("error", e.message);
        res.status(500).send(e.message);
    }
};

const getRecipeByUserId = async (res, userId) => {
    try{
        const [rows] = await promisePool.query("SELECT * FROM recipe WHERE user_id = ?",[userId]);
        console.log("getting recipes by userID",rows);
        return rows
    }catch(e){
        console.error("error", e.message);
        res.status(500).send(e.message);
    }
};

const addRecipe = async (recipe, res) => {
  try{
 //   const sql = 'INSERT INTO recipe (name,user_id,ingredients,instructions,img) VALUES = (?,?,?,?,?)';
  //  const values = [recipe.name, recipe.userId, recipe.ingredients, recipe.instructions, recipe.img];
    const [result] = await promisePool.query(
    'INSERT INTO recipe (name,user_id,ingredients,instructions,img) VALUES (?,?,?,?,?)'
    ,[recipe.name, recipe.userid, recipe.ingredients, recipe.instructions, recipe.img]);
    console.log([result])
    return result.insertId
  }catch(e){
    console.error("error",e.message);
    res.status(500).send(e.message);
  }
};

const updateRecipeById = async (recipe, userId, res) =>{
    try{
        let sql, values;
        sql = "UPDATE recipe SET name=?,ingredients=?, instructions=?, img=? WHERE id=?";
        values = [recipe.name, recipe.ingredients, recipe.instructions, recipe.img, recipe.id];
        const [rows] = await promisePool.query(sql,values);
        return rows;
    }catch(e){
        console.error("error", e.message);
        res.status(500).json({"error": e.message});
    }
}

const getRecipeByName = async (res, recipeName) =>{
    try{
        const [rows] = await promisePool.query("SELECT * FROM recipe WHERE name LIKE ?",[recipeName+"%"]);
        console.log([rows]);
        return rows;
    }catch(e){
        console.error("error",e.message);
        res.status(500).send(e.message);
      }
}

module.exports = {
    getAllRecipes,
    getRecipeById,
    getRecipeByUserId,
    addRecipe,
    updateRecipeById,
    getRecipeByName
};