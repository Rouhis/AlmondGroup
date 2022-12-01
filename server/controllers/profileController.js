'use strict'
const profileModule = require('../models/profileModule')

const getProfiles = async(req, res) => {
    const profiles = await profileModule.getProfiles(res)
    res.json(profiles)
}



module.exports = {
    getProfiles
}