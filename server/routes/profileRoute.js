"use strict";

const express = require("express");
const router = express.Router();
const profileController = require('../controllers/profileController')

router.get("/",profileController.getProfiles)
        .get('/:profileId', profileController.getProfile)



module.exports = router