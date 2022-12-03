"use strict";

const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController')

router.get("/", userController.getUsers)
        .get('/:userId', userController.getUser)



module.exports = router