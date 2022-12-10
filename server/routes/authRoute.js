"use strict";

const express = require("express");
const router = express.Router();
const {body} = require('express-validator')
const{login, logout, createUser} = require('../controllers/authController')

router
        .post('/login', login)
        .post(
            '/register',
        body('username').isLength({min:3}).trim().escape(),
        body('password').isLength({min:5}).trim(),
        createUser)



module.exports = router