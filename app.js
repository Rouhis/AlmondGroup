"use strict";
const express = require("express");
const app = express();
const cors = require("cors");
const recipeRouter = require("./backend/routes/recipeRoute");
const commentRouter = require("./backend/routes/commentRoute");
const favRouter = require("./backend/routes/favRoute");

const port = 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use("/recipe",recipeRouter);
app.use("/comment",commentRouter);
app.use("/fav",favRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));