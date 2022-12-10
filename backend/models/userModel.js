
"use strict";
const { validationResult } = require("express-validator");
const pool = require("../db/db");
const promisePool = pool.promise();

const getAllUsers = async (res) => {
    try{
        const [rows] = await promisePool.query("SELECT * FROM user")
        return rows
    } catch(e){
        console.error("error", e.message);
        res.status(500).send(e.message);
    }
};

const getUserById = async (res, userId) => {
    try{
        const [rows] = await promisePool.query("SELECT * FROM user WHERE id = ?",[userId]);
        console.log("getting user", rows[0]);
        return rows[0];
    }catch(e){
        console.error("error", e.message);
        res.status(500).send(e.message);
    }
};

const getUserLogin = async (user) => {
    try {
      console.log('getUserLogin()', user);
      const [rows] = await promisePool.execute(
          'SELECT * FROM user WHERE username = ?;',
          user);
      return rows;
    } catch (e) {
      console.error("error", e.message);
      res.status(500).send(e.message);
    }
  };

const addUser = async (user, res) => {
  try {
    const sql = 'INSERT INTO user VALUES (null, ?, ?, ?)';
    const values = [user.username, user.password, user.role];
    const [result] = await promisePool.query(sql, values);
    return result.insertId;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    getUserLogin
}
