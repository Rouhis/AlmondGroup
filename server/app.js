"use strict";
const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const authRouter = require("./routes/authRoute");
const passport = require("passport");

const port = 3000;

app.use(cors());

app.use(express.json());
app.use(passport.initialize())
app.use(express.urlencoded({extended:true}));
app.use("/auth",authRouter)
app.use("/user",userRouter);


app.listen(port, () => console.log(`app listening on port ${port}!`))

