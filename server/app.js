'use strict'
const express = require('express');
const app = express();
const cors = require('cors');
const profileRoute = require('./routes/profileRoute')
const port = 3000;

app.use(cors())
app.use(express.json)
app.use(express.urlencoded({extended:true}));

app.use('/profile',profileRoute);


app.listen(port, () => console.log(`app listening on port ${port}!`))