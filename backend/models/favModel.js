"use strict"

const pool = require("../db/db");
const promisePool = pool.promise();

const getFav = async (res)=>{
    try{
        const [rows] = await promisePool.query("SELECT * FROM fav");
        return rows;
    } catch(e){
        console.error("error",e.message);
        res.status(500).send(e.message);
    }
};

const getFavByUser = async (res,userId)=>{
    try{
        const [rows] = await promisePool.query("SELECT * FROM fav WHERE user_id=?",[userId]);
        console.log("getting favovites", rows);
        return rows;
    } catch(e){
        console.error("error", e.message);
        res.status(500).send(e.message);
    }
};

const addFav = async (favo,res)=>{
    try{
        
        const [result] = await promisePool.query("INSERT INTO fav(recipe_id, user_id) VALUES (?,?)",[favo.recipeId,favo.userId])
    } catch(e){
        console.error("error",e.message);
        res.status(500).send(e.message);
    }
}

module.exports = {
    getFav,
    getFavByUser,
    addFav
}