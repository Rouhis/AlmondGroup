"use strict";
const express = require("express");
const app = express();
const cors = require("cors");
const recipeRouter = require("./backend/routes/recipeRoute");

const port = 3000;


app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/recipe",recipeRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));