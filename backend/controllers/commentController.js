"use strict"

const { validationResult } = require("express-validator");
const commentModel = require("../models/commentModel");

const getComments = async (req,res) => {
    const comments = await commentModel.getAllComments(res);
    res.json(comments);
};

const getCommentsByRecipeId = async (req,res) => {
    const comment = await commentModel.getCommentsByRecipeId(res, req.params.recipeId)
    if(comment){
        res.json(comment);
    } else {
        res.sendStatus(404);
    }
};

const getCommentByUserId = async (req,res) => {
    const comments = await commentModel.getCommentByUserId(res, req.params.userId);
    if(comments){
        res.json(comments)
    }else{
        res.sendStatus(404);
    }
};

const createComment = async (req,res) =>{
    const errors = validationResult(req);
    if(errors.isEmpty){
        const comment = req.body;
        console.log("Creating a new comment",comment);
        const commentId = await commentModel.addComment(comment,res);
        res.status(201).json({message: "comment created", commentId});
    } else {
        console.log("validation errors", errors);
        res.status(400).json({message: "comment creation failed", errors: errors.array()});  
      }
}

const deleteComment = async (req,res)=>{
    const comment = req.body;
    const result = await commentModel.deleteComment(comment,res);
    console.log("comment deleted",result);

    if (result.affectedRows > 0) {
        res.json({message: 'comment deleted'});
      } else {
        res.status(401).json({message: 'comment delete failed'});
      }
}


module.exports = {
    getComments,
    getCommentsByRecipeId,
    getCommentByUserId,
    createComment,
    deleteComment
}