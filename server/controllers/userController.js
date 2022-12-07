
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
const createUser = async (req, res) => {
    console.log('Creating a new user:', req.body);
    const newUser = req.body;
    if (!newUser.role) {
      
      newUser.role = 1;
    }
    const errors = validationResult(req);
    console.log('validation errors', errors);
    if (errors.isEmpty()) {
        const salt = await bcrypt.genSalt();
        const paswordHash = await bcrypt.hash(newUser.password, salt);
        newUser.password = paswordHash;
      const result = await userModel.addUser(newUser, res);
      res.status(201).json({message: 'user created', userId: result});
    } else {
      res.status(400).json({
        message: 'user creation failed',
        errors: errors.array()
      });
    }
  };


module.exports = {
    getUsers,
    getUser,
    createUser,
    
}

