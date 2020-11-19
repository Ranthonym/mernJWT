const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User");

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      // Something went wrong with db
      if (err) return done(err);
      // if no user exists
      if (!user) return done(null, false);
      // chech if password is correct
      user.comparePassword(password, done);
    });
  })
);
