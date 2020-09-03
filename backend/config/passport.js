require("dotenv").config;
//passport strategy
const JwtStrategy = require("passport").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const { deserializeUser } = require("passport");
const User = mongoose.model("User");

//options is an object literal containing the otions to control
//how the token is extracted from the request of verified

const options = {}
//jwt from request (required) function that accepts a request
//as the only parameter and returns either the JWT as a string or null.
//fromAuthHeaderAsBearerToken() creates an extractor that looks for the JWT in the auth header

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET;

module.exports = (passport) => {
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
        //jwt paylod is an object literal containing the decoded JWT payload
        //done is a passport callback that has error first as an argument
        //done (err, user, info)
        .then(user => {
            if (user) {
                //if user is found return null for error and return user
                return done(null, user);
            } else {
            //if no user found
            return done(null, false); 
        }
        })
        .catch(error => console.log(error));
    }));
}



