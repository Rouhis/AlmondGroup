"use strict"

const { validationResult } = require("express-validator");
const { createPool } = require("mysql2");
const favModel = require("../models/favModel");

const getFav = async (req,res) => {
    const favs = await favModel.getFav(res);
    res.json(favs);
};

const getFavByUser = async (req,res) => {
    const fav = await favModel.getFavByUser(res, req.params.userId)
    if(fav){
        res.json(fav);
    } else {
        res.sendStatus(404);
    }
};

const addFav = async (req,res) => {
    const errors = validationResult(req);
    if(errors.isEmpty){
        const favo = req.body;
        console.log("adding to favorite",favo);
        const favId = await favModel.addFav(favo,res);
        res.status(201).json({message: "added to favorite", favId})
    }else{
        console.log("validation errors", errors);
        res.status(400).json({message: "favorite add failed", errors: errors.array()});  
    }
}


module.exports = {
    getFav,
    getFavByUser,
    addFav
}