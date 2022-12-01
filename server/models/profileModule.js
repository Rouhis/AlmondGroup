'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllProfiles = async (res) => {
  try {
    const sql = 'SELECT * FROM user';
    const [rows] = await promisePool.query(sql);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};
const getProfileById = async (res, profileId) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM user WHERE id= ?',[profileId]);
    console.log("getting profile",rows[0])
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

module.exports = {
    getAllProfiles,
    getProfileById
   
};
 