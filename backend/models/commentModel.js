"use strict"
//const { resolveSoa } = require("dns");
const pool = require("../db/db");
const promisePool = pool.promise();

const getAllComments = async (res)=>{
    try{
        const [rows] = await promisePool.query("SELECT * FROM comments");
        return rows;
    } catch(e){
        console.error("error",e.message);
        res.status(500).send(e.message);
    }
};

const getCommentsByRecipeId = async (res, recipeId)=>{
    try{
        const [rows] = await promisePool.query("SELECT * FROM comments WHERE recipe_id=?",[recipeId]);
        console.log("getting commets", rows);
        return rows;
    } catch(e){
        console.error("error", e.message);
        res.status(500).send(e.message);
    }
};

const getCommentByUserId = async (res, userId)=>{
 try{
    const [rows] = await promisePool.query("SELECT * FROM comments WHERE user_id=?",[userId]);
    console.log("getting comments by userID",rows);
    return rows;
 } catch(e){
    console.error("error", e.message);
    res.status(500).send(e.message);
 }
};

const addComment = async (comment,res) => {
    try{
        const [result] = await promisePool.query("INSERT INTO comments(user_id,recipe_id,data) VALUES (?,?,?)",[comment.user_id,comment.recipe_id,comment.data]);
        console.log([result]);
        return result.insertId;
    }catch(e){
        console.error("error",e.message);
        res.status(500).send(e.message);
      }
};

const deleteComment = async (comment,res) => {
    try{
        const [rows] = await promisePool.query("DELETE FROM comments WHERE id=? AND user_id=?",[comment.id,comment.user_id]);
        return rows;
    }catch (e) {
        console.error('error', e.message);
        res.status(500).send(e.message);
      }
};

const getCommentAndUser = async (res,recipeId) => {
    try{
        const [rows] = await promisePool.query("SELECT comments.id, comments.data, user.username FROM comments INNER JOIN user ON comments.user_id = user.id WHERE comments.recipe_id =?;",[recipeId]);
        return rows;
    }catch (e) {
        console.error('error', e.message);
        res.status(500).send(e.message);
      }
}

module.exports={
    getAllComments,
    getCommentsByRecipeId,
    getCommentByUserId,
    addComment,
    deleteComment,
    getCommentAndUser
}