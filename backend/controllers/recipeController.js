"use strict";
const { validationResult } = require("express-validator");
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
};

const getRecipeByUserId = async (req,res) => {
    const recipes = await recipeModel.getRecipeByUserId(res, req.params.userId);
    if(recipes){
        res.json(recipes)
    }else{
        res.sendStatus(404);
    }
}; 

const createRecipe = async (req,res) => {
    const errors = validationResult(req);
    if(errors.isEmpty){
    const recipe = req.body;
    console.log("Creating a new recipe",recipe);
    const recipeId = await recipeModel.addRecipe(recipe, res);
    res.status(201).json({message: "recipe created", recipeId});
    } else{
        console.log("validation errors", errors);
        res.status(400).json({message: "recipe creation failed", errors: errors.array()});
    }
}


module.exports = {
    getRecipes,
    getRecipeById,
    getRecipeByUserId,
    createRecipe
}