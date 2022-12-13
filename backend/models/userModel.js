/**
 * @author Leo Gong <Leo.Gong@metropolia.fi>
 */


/* Importing the modules that are needed for the file. */
"use strict";
const { validationResult } = require("express-validator");
const pool = require("../db/db");
const promisePool = pool.promise();

/**
 * It returns a promise that resolves to an array of rows from the user table.
 * @param res - the response object
 * @returns the rows from the database.
 */
const getAllUsers = async (res) => {
  try {
    const [rows] = await promisePool.query("SELECT * FROM user");
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

/**
 * It takes a response object and a userId, and returns a user object.
 * @param res - the response object
 * @param userId - the id of the user you want to get
 * @returns the rows[0] object.
 */
const getUserById = async (res, userId) => {
  try {
    const [rows] = await promisePool.query("SELECT * FROM user WHERE id = ?", [
      userId,
    ]);
    console.log("getting user", rows[0]);
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

/**
 * "getUserLogin()" is an async function that takes a user as a parameter, and returns a row from the
 * database if the user exists.
 * @param user - {
 * @returns the rows from the database.
 */
const getUserLogin = async (user) => {
  try {
    console.log("getUserLogin()", user);
    const [rows] = await promisePool.execute(
      "SELECT * FROM user WHERE username = ?;",
      user
    );
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

/**
 * It takes a user object and a response object as parameters, and then it tries to insert the user
 * object into the database. If it succeeds, it returns the id of the inserted user. If it fails, it
 * sends an error message to the response object.
 * @param user - {
 * @param res - the response object
 * @returns The result.insertId is being returned.
 */
const addUser = async (user, res) => {
  try {
    const sql = "INSERT INTO user VALUES (null, ?, ?, ?)";
    const values = [user.username, user.password, user.role];
    const [result] = await promisePool.query(sql, values);
    return result.insertId;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

/* Exporting the functions from the file. */
module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  getUserLogin,
};
