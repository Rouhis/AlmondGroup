"use strict";
const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/userRoute");

const port = 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/user",userRouter);


app.listen(port, () => console.log(`app listening on port ${port}!`))
