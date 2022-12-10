
"use strict";
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const userModel = require("../models/userModel");

const getUsers = async (req,res) => {
    const users = await userModel.getAllUsers(res);
    res.json(users);
};

const getUser = async (req,res) => {
    const user = await userModel.getUserById(res, req.params.userId);
    if(user){
        res.json(user);
    }else{
        res.sendStatus(404);
    }
};


module.exports = {
    getUsers,
    getUser,
}

