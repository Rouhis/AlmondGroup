"use strict";
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
}

module.exports = {
    getAllRecipes,
    getRecipeById,
    getRecipeByUserId
};