"use strict";
const recipeModel = require("../models/recipeModel");

const getRecipes = async (req,res) => {
    const recipes = await recipeModel.getAllRecipes(res);
    res.json(recipes);
};

const getRecipeById = async (req,res) => {
    const recipe = await recipeModel.getRecipeById(res, req.params.recipeId);
    if(recipe){
        res.json(recipe);
    }else{
        res.sendStatus(404);
    }
}

const getRecipeByUserId = async (req,res) => {
    const recipes = await recipeModel.getRecipeByUserId(res, req.params.userId);
    if(recipes){
        res.json(recipes)
    }else{
        res.sendStatus(404);
    }
}


module.exports = {
    getRecipes,
    getRecipeById,
    getRecipeByUserId
}