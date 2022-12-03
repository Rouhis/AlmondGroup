
"use strict";
const { validationResult } = require("express-validator");
const pool = require("../database/db");
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

module.exports = {
    getAllUsers,
    getUserById
}
