require("dotenv").config;
//passport strategy
const JwtStrategy = require("passport").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const { deserializeUser } = require("passport");
const User = mongoose.model("User");

const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET;

module.exports = (passport) => {
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
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



