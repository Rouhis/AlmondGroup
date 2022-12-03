/*'use strict'
const profileModule = require('../models/userModel')

const getProfiles = async(req, res) => {
    const profiles = await profileModule.getAllProfiles(res)
    res.json(profiles)
}

const getProfile = async (req, res) => {

    const profile = await profileModule.getProfileById(res, req.params.profileId);
    if (profile) {
      res.json(profile);
    } else {
      res.sendStatus(404);
    }
  };


module.exports = {
    getProfiles,
    getProfile,    
}*/



"use strict";
const { validationResult } = require("express-validator");
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