'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require('bcryptjs');
const {getUserLogin} = require('../models/userModel');
const dotenv = require('dotenv');
dotenv.config();


passport.use(
  new Strategy(async (username, password, done) => {
    const params = [username];
    
    try {
      const [user] = await getUserLogin(params);
      console.log('Local strategy', user);
      if (user === undefined) {
        return done(null, false, {message: 'Incorrect username.'});
      }
      
      const passwordOK = await bcrypt.compare(password, user.password);
      console.log(passwordOK)
      if (!passwordOK) {
        return done(null, false, {message: 'Incorrect password.'});
      }
      
      return done(null, user, {message: 'Logged In Successfully'});
    } catch (err) {
      return done(err);
    }
  })
);


passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    (jwtPayload, done) => {
     
      return done(null, jwtPayload);
    }
  )
);

module.exports = passport;