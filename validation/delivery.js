//43A- Create a const for the JWTStrategy
const JwtStrategy = require('passport-jwt').Strategy;
//43B-Extract the JWT
const ExtractJwt = require('passport-jwt').ExtractJwt;
//43C-When we extract the token, we compare it with the user model in the database, so we use mongoose to find our user model
const mongoose = require('mongoose');
//43D- We have to get our user model so that we can properly do the comparisom
const User = mongoose.model('users'); // we pass in the name we called our users model when we exported the module.ie mongoose.models('users', )
//43E- WE WILL also need the secret key, so let us require it
const keys = require('../Config/Keys');
//43F- we configure options for our passport
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
//43G- we export the passport Strategy. We now go and initialize  this strategy in our server.js 44
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
