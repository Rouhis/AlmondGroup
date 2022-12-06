"use strict"

const express = require("express");
const router = express.Router();
const multer = require("multer");
const {body} = require("express-validator");
const commentController = require("../controllers/commentController");


const fileFilter = (req, file, cb) => {
    const acceptedTypes = ["image/jpeg","image/png","image/gif"];
    if (acceptedTypes.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(null,false);
    }
};

const upload = multer({dest: "uploads/", fileFilter});


router.get("/",commentController.getComments)
.get("/:recipeId", commentController.getCommentsByRecipeId)
.get("/user/:userId",commentController.getCommentByUserId)
.post("/",
body("user_id"),
body("recipe_id"),
body("data"),commentController.createComment);



module.exports = router;