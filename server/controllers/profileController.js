'use strict'
const profileModule = require('../models/profileModule')

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
}