"use strict";
const express = require("express");
const app = express();
const cors = require("cors");
const recipeRouter = require("./backend/routes/recipeRoute");
const commentRouter = require("./backend/routes/commentRoute");
const favRouter = require("./backend/routes/favRoute");

const userRouter = require("./backend/routes/userRoute");
const authRouter = require("./backend/routes/authRoute");
const passport = require("./backend//utils/passport");
//const profileRoute = require('./backend/routes/profileRoute')

const port = 3000;

app.use(express.static('uploads'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//app.use('/profile',profileRoute);
app.use("/recipe",recipeRouter);
app.use("/comment",commentRouter);
app.use("/fav",favRouter);
app.use("/auth",authRouter)
app.use("/user",userRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));